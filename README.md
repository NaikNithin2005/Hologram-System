# 🌌 Intelligent Holographic Interaction System

[![MediaPipe](https://img.shields.io/badge/AI-MediaPipe-blue.svg)](https://mediapipe.dev/)
[![Three.js](https://img.shields.io/badge/3D-Three.js-black.svg)](https://threejs.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

An advanced, touchless interface designed for 3D holographic projection. This system integrates real-time hand gesture recognition and voice command processing to provide a futuristic, "Iron Man"-style interaction with complex 3D structures.

---

## 🧠 Advanced Algorithms & Technology

The system uses a combination of several advanced algorithms across computer vision, natural language processing, and 3D graphics:

### 1. Computer Vision (Hand Tracking)
The core gesture detection is handled by the **MediaPipe Hands** pipeline, which uses two main algorithms:
*   **BlazePalm (Single-Shot Palm Detection)**: A specialized detector optimized for mobile/real-time use. It locates the hand in the video frame by identifying bounding boxes, even when hands are partially obscured or moving quickly.
*   **Hand Landmark Regression**: Once the palm is found, this algorithm identifies **21 distinct 3D landmarks** (joints and tips). It uses a regression-based neural network to map these points with high precision.
*   **Euclidean Distance Heuristics**: For gesture classification (like "Pinch"), I implemented a custom algorithm that calculates the Euclidean distance between the `THUMB_TIP` and `INDEX_TIP` landmarks. If the distance falls below a specific threshold, the gesture is triggered.

### 2. Natural Language Processing (Voice Control)
The voice system uses the **Google Speech Recognition Engine**:
*   **Deep Neural Networks (DNN)**: The underlying engine uses massive neural networks to convert acoustic waveforms into text (Transcoding).
*   **Regex Pattern Matching**: My custom script then runs a Regular Expression (Regex) algorithm over the recognized text to match keywords (like "rotate" or "next") to specific system functions.

### 3. 3D Graphics & Animation
The 3D environment is managed by **Three.js** using:
*   **Linear Interpolation (Lerp)**: Used to create "Smooth Zoom." Instead of the camera jumping instantly, the system calculates intermediate positions every frame to ensure the movement feels fluid and high-end.
*   **Matrix Transformations**: All rotations and translations of the 3D objects are handled via Quaternion-based rotation algorithms, which prevent "Gimbal Lock" (a common issue in 3D rotations).

### 4. Holographic Display
*   **Pepper’s Ghost Algorithm**: While technically a physical optical effect, the code handles the 4-View Split Algorithm. It splits the screen into four viewports, rotates them by 90-degree increments, and mirrors them. This ensures that when the light is reflected off a plastic pyramid, the 3D object appears perfectly centered and upright from all sides.

---

## ✨ Key Features

- **👐 Gesture-Driven Control**: Navigate 3D models using natural hand motions (Pinch to zoom, swipe to rotate, thumb gestures to switch objects).
- **🗣️ Voice-Activated HUD**: Control the system via voice commands like *"Next Object"*, *"Rotate Left"*, or *"Stop Animation"*.
- **📐 4-Way Holographic Projection**: Features a specialized viewport split optimized for Pepper's Ghost pyramids, providing a 360° 3D illusion.
- **🎨 Minimalist UI/UX**: A clean, distraction-free interface with glassmorphism effects and real-time telemetry monitors.
- **⚡ High Performance**: Low-latency tracking powered by MediaPipe's lightweight neural networks.

---

## 🛠️ Tech Stack

- **Frontend**: 
  - `Three.js` (3D Rendering Engine)
  - `MediaPipe Hands` (AI Gesture Tracking)
  - `Web Speech API` (Voice Recognition)
  - `Vanilla CSS` (Glassmorphism UI)
- **Backend**: 
  - `Python` (Flask Server)
  - `OpenCV` (Video Processing)
- **Physics**: 
  - `Pepper's Ghost Principle` (Optical Illusion display)

---

## 🚀 Getting Started

### Prerequisites
- Python 3.8+
- Modern Web Browser (Chrome/Edge recommended for Web Speech API support)
- Webcam (For gesture tracking)

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/YourUsername/Hologram-System.git
   cd Hologram-System
   ```

2. **Setup Backend**:
   ```bash
   cd backend
   pip install -r requirements.txt
   python server.py
   ```

3. **Launch Frontend**:
   - Open `frontend/index.html` in your browser.
   - Allow camera and microphone permissions.

---

## 🎮 How to Use

### 🖐️ Hand Gestures
| Gesture | Action |
| :--- | :--- |
| **Index + Thumb Pinch** | Dynamic Zoom In/Out |
| **Palm Swipe (Left/Right)** | Manual Rotation |
| **Thumb Up** | Next 3D Object |
| **Index Finger Point** | Previous 3D Object |

### 🎙️ Voice Commands
- *"Next"* / *"Previous"*: Switch between 3D models.
- *"Rotate"* / *"Stop"*: Toggle automatic rotation.
- *"Hologram Mode"*: Toggle between full-screen and 4-way split view.

---

## 📁 Project Structure

```text
├── frontend/
│   ├── index.html       # Minimalist HUD Structure
│   ├── main.js          # Three.js 3D Logic & Split-View
│   ├── style.css        # Glassmorphism UI & Layout
│   └── gesture_detector.js # MediaPipe Bridge
├── backend/
│   ├── server.py        # Communication Bridge
│   └── gesture_detector.py # OpenCV Fallback Logic
└── models/              # (Optional) Custom GLTF/GLB files
```

---

## 🗺️ Future Roadmap

- [ ] **Custom Model Upload**: Support for users to upload their own `.glb` files.
- [ ] **Dual Hand Interaction**: Two-handed scaling and rotation.
- [ ] **AR Integration**: Mobile browser support using WebXR.
- [ ] **Haptic Feedback**: Sound-based confirmation for successful gestures.

---

## 📄 License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Acknowledgments
- Google MediaPipe for the incredible tracking models.
- Three.js community for the 3D rendering inspiration.
