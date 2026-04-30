import asyncio
import websockets
import json
import threading
from voice_recognizer import VoiceRecognizer

class HologramServer:
    def __init__(self):
        self.clients = set()
        self.voice_recognizer = VoiceRecognizer(callback=self.on_voice_command)
        self.running = True

    def on_voice_command(self, data):
        # Broadcast voice commands immediately
        asyncio.run(self.broadcast(json.dumps(data)))

    async def register(self, websocket):
        self.clients.add(websocket)
        try:
            await websocket.wait_closed()
        finally:
            self.clients.remove(websocket)

    async def broadcast(self, message):
        if self.clients:
            await asyncio.gather(*[client.send(message) for client in self.clients])

    async def main(self):
        self.voice_recognizer.start_listening()
        
        async with websockets.serve(self.register, "localhost", 8765):
            print("WebSocket Server started on ws://localhost:8765")
            while self.running:
                await asyncio.sleep(0.1) # Keep the server running
                
        self.voice_recognizer.stop_listening()

if __name__ == "__main__":
    server = HologramServer()
    try:
        asyncio.run(server.main())
    except KeyboardInterrupt:
        server.running = False
        print("Server stopped.")
