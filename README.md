<img width="3188" height="1202" alt="frame (3)" src="https://github.com/user-attachments/assets/517ad8e9-ad22-457d-9538-a9e62d137cd7" />

website link :  https://celadon-kleicha-4a8aa9.netlify.app


MOODTUNES 🎯


TEAM NAME:BITSTROM

### Team Members
- Team Lead: Snehalakshmi k p- SNMIMT
- Member 2: Dilraj p d- SNMIMT

### Project Description
Problem Description

Music plays a major role in shaping and reflecting human emotions. People often turn to music to feel better, relax, or enhance their mood. However, most music recommendation systems on platforms like Spotify or YouTube rely on past listening history, liked songs, or genre preferences.

This creates a problem because:

A person’s mood changes frequently, and music preferences may not match their past choices.

Users sometimes don’t know what they want to listen to in the moment.

Current systems cannot detect real-time emotions, so they fail to recommend songs that match the user’s current feelings.


For example:

If someone is feeling sad, they may want soft and calming music — but the app might suggest upbeat songs because that’s what they listened to yesterday.

If someone is happy, they might want energetic songs — but the app doesn’t adapt instantly.


This gap between emotional state and music recommendations reduces personalization and overall satisfaction with music streaming apps.

In short: Current music apps don’t “feel” the listener’s mood in real time, leading to less relevant and less engaging music suggestions.



### The Problem

> People often don’t know what kind of music they want to listen to — especially when their mood keeps changing.
> Sad and need cheering up
> Happy and want to keep the vibe going
> Stressed and need something relaxing

🎵 But most apps recommend music based on past behavior or genre, not how you feel right now.



### The Solution 
> EmoTune is a web app that detects your facial expression using your webcam and then recommends music based on your current emotion.

### For Software:
### Frontend:

HTML, CSS, JavaScript / React.js

Webcam capture using getUserMedia

Emotion detection with face-api.js or MediaPipe + TensorFlow.js

### Backend (optional):

Node.js or Flask (if you want to store user preferences or log sessions)

Music API:

Spotify API or YouTube Data API for fetching music


# Run


### Project Documentation
Project Title:
EmoTune – Music Recommendation by Facial Emotion Detection


---

1. Abstract

Music has the power to influence and reflect human emotions. Traditional music recommendation systems rely heavily on listening history, favorite artists, or genres, which do not capture a user’s current emotional state. EmoTune is an AI-powered web application that detects a user’s facial emotion via webcam and recommends music that matches their present mood. Using computer vision and machine learning, the app identifies emotions like happiness, sadness, anger, and surprise, then fetches playlists from Spotify or YouTube to suit that mood. This system creates a real-time, personalized, and engaging music experience.


---

2. Problem Statement

Selecting the right music is often challenging when users are unsure what they want to listen to or when their mood changes rapidly. Current music platforms recommend songs based on past activity but fail to adapt to real-time mood shifts. This results in a gap between the user’s emotional needs and the music they are recommended.


---

3. Objectives

Detect a user’s current emotional state from facial expressions in real time.

Recommend personalized playlists based on detected emotions.

Provide an interactive and enjoyable music experience.

Optionally store mood history for emotional pattern analysis.



---

4. Scope

The system will:

Access webcam feed to capture the user’s face.

Detect facial emotion using AI models (face-api.js / MediaPipe / TensorFlow.js).

Recommend relevant music using the Spotify API or YouTube Data API.

Display a dynamic and responsive interface.

Optionally store user mood logs for analytics.



---

5. Methodology

Step 1: Emotion Detection

Capture the live webcam stream using the getUserMedia API.

Process the video frames using face-api.js to detect emotions (happy, sad, angry, neutral, surprised).


Step 2: Music Recommendation

Map each detected emotion to a playlist category. Example:

Happy → Pop hits / upbeat tracks

Sad → Lo-fi, acoustic, calming music

Angry → Rock, rap, energetic tracks


Fetch matching playlists from Spotify Web API or YouTube API.


Step 3: UI Interaction

Display detected emotion and playlist.

Allow user to play, skip, and save songs.


Step 4: (Optional) Backend Logging

Save user’s emotion history in a database (MongoDB / MySQL) for analysis.



---

6. System Architecture

Frontend:

HTML, CSS, JavaScript (or React.js)

face-api.js for emotion detection

Spotify / YouTube embedded player


Backend (optional):

Node.js with Express.js

MongoDB / MySQL database


APIs Used:

Spotify Web API or YouTube Data API



---

7. Features

✅ Real-time emotion detection from webcam
✅ Music recommendations based on mood
✅ Spotify / YouTube integration
✅ Responsive UI design
✅ Optional mood history tracking
✅ Dynamic backgrounds that change with mood


---

8. Advantages

Real-time, adaptive recommendations.

Fun and interactive user experience.

Works on both desktop and mobile.

Encourages emotional well-being through music.



---

9. Limitations

Requires internet connection.

Accuracy depends on lighting and webcam quality.

Privacy concerns (webcam access needed).



---

10. Future Enhancements

Voice-based emotion detection.

AI-generated playlists from emotion data.

Integration with smart speakers and wearables.

Offline mode with pre-downloaded playlists.



---

11. Conclusion

EmoTune bridges the gap between emotional state and music selection by combining AI-driven facial emotion detection with music streaming APIs. Unlike traditional recommendation systems, it adapts to how the user feels right now, providing a personalized, dynamic, and engaging music experience. This technology has applications not just for entertainment but also for emotional therapy and well-being.


---

12. References

Spotify Web API Documentation

YouTube Data API Documentation

face-api.js GitHub

MediaPipe by Google


# Screenshots
(https://drive.google.com/drive/folders/1SOyWm3ppfrAFH7-0Kej-rqXTkxlkwlJG?usp=drive_link)

# Build Photos
(https://drive.google.com/drive/folders/1e1eRZSbhHr2hskpPsEigbkBOVX9vFow3?usp=drive_link)

### Project Demo
# Video
(https://drive.google.com/drive/folders/1YNEcoGqVj1BPju4CFoL6YRQShkD4BcXz?usp=drive_link)



## Team Contributions
- Snehalakshmi k p - decision making and problem solving
- Dilraj p d - coding specilizer and critical thinking


---
Made with ❤️ at TinkerHub Useless Projects 

![Static Badge](https://img.shields.io/badge/TinkerHub-24?color=%23000000&link=https%3A%2F%2Fwww.tinkerhub.org%2F)
![Static Badge](https://img.shields.io/badge/UselessProjects--25-25?link=https%3A%2F%2Fwww.tinkerhub.org%2Fevents%2FQ2Q1TQKX6Q%2FUseless%2520Projects)


