import asyncio
import websockets

async def handler(ws):
    pass

async def main():
    async with websockets.serve(handler, 'localhost', 8766):
        print("Test server running")
        await asyncio.sleep(30)

asyncio.run(main())
