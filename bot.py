
import os
import asyncio
from datetime import datetime, timedelta, timezone

import discord
from discord.ext import commands

# ================== CONFIG ÜBER ENV VARS ==================
# In Railway:
#   DISCORD_TOKEN       = dein Bot Token
#   DISCORD_CHANNEL_ID  = Channel-ID (z.B. 119876543210987654)
TOKEN = os.getenv("DISCORD_TOKEN")
CHANNEL_ID_ENV = os.getenv("DISCORD_CHANNEL_ID")

if TOKEN is None or CHANNEL_ID_ENV is None:
    raise RuntimeError(
        "Bitte DISCORD_TOKEN und DISCORD_CHANNEL_ID als Environment-Variablen setzen!"
    )

TARGET_CHANNEL_ID = int(CHANNEL_ID_ENV)

# Countdown-Länge: 12 Tage
COUNTDOWN_DAYS = 12
COUNTDOWN_TOTAL = COUNTDOWN_DAYS * 24 * 60 * 60  # Sekunden
# ==========================================================

# Globale Zustände
timer_message = None          # type: discord.Message | None
countdown_task = None         # type: asyncio.Task | None
end_time = None               # type: datetime | None

# Ping-Flags
ping_10d_done = False
ping_24h_done = False
ping_12h_done = False
ping_6h_done = False

# Discord-Intents
intents = discord.Intents.default()
intents.message_content = True

bot = commands.Bot(command_prefix="!", intents=intents)


def format_remaining(seconds: int) -> str:
    """Formatiert die Restzeit schön lesbar."""
    if seconds < 0:
        seconds = 0
    days, rem = divmod(seconds, 24 * 3600)
    hours, rem = divmod(rem, 3600)
    minutes, _ = divmod(rem, 60)

    parts = []
    if days > 0:
        parts.append(f"{days} Tag{'e' if days != 1 else ''}")
    if hours > 0 or days > 0:
        parts.append(f"{hours} Std")
    parts.append(f"{minutes} Min")

    return " · ".join(parts)


async def update_timer_message():
    """Aktualisiert die Countdown-Nachricht mit aktueller Restzeit."""
    global timer_message, end_time

    if timer_message is None or end_time is None:
        return

    now = datetime.now(timezone.utc)
    remaining = int((end_time - now).total_seconds())
    countdown_text = format_remaining(remaining)

    content = (
        "⏱ **Render Countdown**\n\n"
        f"Restzeit: **{countdown_text}**\n\n"
        "Nutze den Button unten, um den Timer neu zu starten."
    )

    view = RenderTimerView()
    try:
        await timer_message.edit(content=content, view=view)
    except discord.HTTPException:
        # Nachricht z.B. gelöscht
        pass


def reset_ping_flags():
    """Setzt alle Ping-Flags zurück (für neuen Durchlauf)."""
    global ping_10d_done, ping_24h_done, ping_12h_done, ping_6h_done
    ping_10d_done = False
    ping_24h_done = False
    ping_12h_done = False
    ping_6h_done = False


async def countdown_loop():
    """Hintergrund-Loop für Countdown + Pings."""
    global end_time, countdown_task
    global ping_10d_done, ping_24h_done, ping_12h_done, ping_6h_done
    global timer_message

    try:
        while True:
            if end_time is None or timer_message is None:
                countdown_task = None
                return

            now = datetime.now(timezone.utc)
            remaining = int((end_time - now).total_seconds())

            # Countdown fertig
            if remaining <= 0:
                await update_timer_message()
                await timer_message.channel.send(
                    "@everyone ⏰ Der Render Countdown ist abgelaufen!"
                )
                end_time = None
                countdown_task = None
                return

            # Ping bei 10 Tagen vergangen (noch 2 Tage = 172800 Sekunden)
            if remaining <= 2 * 24 * 3600 and not ping_10d_done:
                ping_10d_done = True
                await timer_message.channel.send(
                    "@everyone 🔔 Es sind 10 Tage vergangen – nur noch 2 Tage bis zum Ende des Render Countdowns!"
                )

            # Ping bei 24h
            if remaining <= 24 * 3600 and not ping_24h_done:
                ping_24h_done = True
                await timer_message.channel.send(
                    "@everyone ⏰ Nur noch 24 Stunden bis zum Ende des Render Countdowns!"
                )

            # Ping bei 12h
            if remaining <= 12 * 3600 and not ping_12h_done:
                ping_12h_done = True
                await timer_message.channel.send(
                    "@everyone ⏰ Nur noch 12 Stunden bis zum Ende des Render Countdowns!"
                )

            # Ping bei 6h
            if remaining <= 6 * 3600 and not ping_6h_done:
                ping_6h_done = True
                await timer_message.channel.send(
                    "@everyone ⏰ Nur noch 6 Stunden bis zum Ende des Render Countdowns!"
                )

            # Nachricht aktualisieren
            await update_timer_message()

            # Update-Intervall: 60 Sekunden
            await asyncio.sleep(60)

    except asyncio.CancelledError:
        countdown_task = None
        raise


class RenderTimerView(discord.ui.View):
    """View mit dem Reset-Button."""

    def __init__(self):
        super().__init__(timeout=None)

    @discord.ui.Button(
        label="Render Timer Reset",
        style=discord.ButtonStyle.danger
    )
    async def reset_button(
        self,
        interaction: discord.Interaction,
        button: discord.ui.Button
    ):
        """Wird aufgerufen, wenn jemand den Reset-Button klickt."""
        global end_time, countdown_task

        # neuen Endzeitpunkt setzen
        end_time = datetime.now(timezone.utc) + timedelta(days=COUNTDOWN_DAYS)
        reset_ping_flags()

        # Falls der Countdown-Task nicht läuft, neu starten
        if countdown_task is None or countdown_task.done():
            loop = asyncio.get_running_loop()
            task = loop.create_task(countdown_loop())
            globals()["countdown_task"] = task

        # Nachricht direkt updaten
        await update_timer_message()

        await interaction.response.send_message(
            "🔁 Der Render Timer wurde zurückgesetzt und läuft wieder von vorne.",
            ephemeral=True
        )


@bot.event
async def on_ready():
    print(f"Eingeloggt als: {bot.user} (ID: {bot.user.id})")
    print("Orga Bot 9287 ist bereit. ✅")


@bot.command(name="start_timer")
@commands.has_permissions(manage_messages=True)
async def start_timer(ctx: commands.Context):
    """
    Startet den Render Countdown im festgelegten Channel.
    Nur für User mit 'Nachrichten verwalten'.
    """
    global timer_message, end_time, countdown_task

    channel = bot.get_channel(TARGET_CHANNEL_ID)
    if channel is None:
        await ctx.send(
            "❌ Der angegebene Channel konnte nicht gefunden werden. "
            "Prüfe bitte DISCORD_CHANNEL_ID in Railway."
        )
        return

    # neue 12 Tage setzen
    end_time = datetime.now(timezone.utc) + timedelta(days=COUNTDOWN_DAYS)
    reset_ping_flags()

    view = RenderTimerView()

    initial_text = (
        "⏱ **Render Countdown**\n\n"
        "Restzeit: **12 Tage · 0 Std · 0 Min**\n\n"
        "Nutze den Button unten, um den Timer neu zu starten."
    )

    timer_message = await channel.send(initial_text, view=view)

    # alten Task stoppen, falls noch aktiv
    if countdown_task is not None and not countdown_task.done():
        countdown_task.cancel()

    loop = asyncio.get_running_loop()
    countdown_task = loop.create_task(countdown_loop())

    await ctx.send(f"✅ Render Countdown im Channel {channel.mention} gestartet.")


@start_timer.error
async def start_timer_error(ctx: commands.Context, error):
    if isinstance(error, commands.MissingPermissions):
        await ctx.send(
            "❌ Du brauchst das Recht **Nachrichten verwalten**, um den Timer zu starten."
        )
    else:
        await ctx.send(f"❌ Fehler beim Starten des Timers: `{error}`")


bot.run(TOKEN)
