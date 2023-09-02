import psycopg2
import pygame
from io import BytesIO
import tkinter as tk
from tkinter import filedialog
from tkinter import messagebox

# Initialize pygame mixer
pygame.mixer.init()

# Database connection parameters
db_params = {
    "dbname": "bubtrxjh",
    "user": "bubtrxjh",
    "password": "zzEdCEA7lXwGx7Aexz_XlHoqzmRan2K2",
    "host": "bubble.db.elephantsql.com",
    "port": "5432"  # Change to the appropriate port if needed
}

# Initialize a flag to track playback status
is_playing = False

def fetch_and_play_audio():
    global is_playing
    try:
        # Connect to the PostgreSQL database
        conn = psycopg2.connect(**db_params)
        cursor = conn.cursor()

        # Replace the SQL query with your query to retrieve the audio data
        cursor.execute("SELECT audio_content FROM audio_metadata WHERE id = %s", (1,))
        audio_data = cursor.fetchone()[0]

        # Create an audio stream from the retrieved audio data
        audio_stream = BytesIO(audio_data)

        # Load the audio stream with pygame mixer
        pygame.mixer.music.load(audio_stream)

        # Play or pause the audio based on the current playback status
        if not is_playing:
            pygame.mixer.music.play()
            is_playing = True
        else:
            pygame.mixer.music.pause()
            is_playing = False

    except Exception as e:
        messagebox.showerror("Error", str(e))
    finally:
        # Clean up database connection
        cursor.close()
        conn.close()

# Create the main window
root = tk.Tk()
root.title("Audio Player")

# Create a Play/Pause button
play_pause_button = tk.Button(root, text="Play", command=fetch_and_play_audio)
play_pause_button.pack(pady=10)

# Create an exit button
exit_button = tk.Button(root, text="Exit", command=root.destroy)
exit_button.pack()

# Start the Tkinter main loop
root.mainloop()
