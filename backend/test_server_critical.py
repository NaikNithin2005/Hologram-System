import asyncio
import websockets
import logging

logging.getLogger("websockets.server").setLevel(logging.CRITICAL)

async def handler(ws):
    pass

async def main():
    async with websockets.serve(handler, 'localhost', 8768):
        print("Test server running")
        await asyncio.sleep(30)

asyncio.run(main())
