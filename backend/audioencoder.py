import psycopg2
import tkinter as tk
from tkinter import filedialog

# Database connection details
db_params = {
    "dbname": "bubtrxjh",
    "user": "bubtrxjh",
    "password": "zzEdCEA7lXwGx7Aexz_XlHoqzmRan2K2",
    "host": "bubble.db.elephantsql.com",
    "port": "5432"  # Change to the appropriate port if needed
}

# Function to upload a song and insert it into the database
def upload_song():
    # Open a file dialog to select a song file
    file_path = filedialog.askopenfilename(filetypes=[("MP3 Files", "*.mp3")])

    if file_path:
        # Read the binary data of the selected song
        with open(file_path, "rb") as audio_file:
            audio_binary_data = audio_file.read()

        try:
            # Connect to the PostgreSQL database
            conn = psycopg2.connect(**db_params)

            # Create a cursor
            cursor = conn.cursor()

            # Extract the file name from the path
            file_name = file_path.split("/")[-1]

            # Insert the audio data into the audio_metadata table
            insert_query = "INSERT INTO audio_metadata (file_name, audio_content) VALUES (%s, %s)"
            cursor.execute(insert_query, (file_name, audio_binary_data))

            # Commit the transaction
            conn.commit()

            # Close the cursor and database connection
            cursor.close()
            conn.close()

            # Display a success message
            result_label.config(text=f"Uploaded and inserted: {file_name}")
        except Exception as e:
            # Display an error message if something goes wrong
            result_label.config(text=f"Error: {str(e)}")

# Create the main window
window = tk.Tk()
window.title("Audio Upload to PostgreSQL")

# Create and pack widgets
upload_button = tk.Button(window, text="Upload Song", command=upload_song)
upload_button.pack(pady=20)

result_label = tk.Label(window, text="", fg="green")
result_label.pack()

# Start the Tkinter main loop
window.mainloop()
