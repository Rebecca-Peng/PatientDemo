import{
   bootstrapCameraKit,
   createMediaStreamSource,
   Transform2D, 
}from '@snap/camera-kit'

(async function (){
    var cameraKit = await bootstrapCameraKit({ apiToken: 'eyJhbGciOiJIUzI1NiIsImtpZCI6IkNhbnZhc1MyU0hNQUNQcm9kIiwidHlwIjoiSldUIn0.eyJhdWQiOiJjYW52YXMtY2FudmFzYXBpIiwiaXNzIjoiY2FudmFzLXMyc3Rva2VuIiwibmJmIjoxNjk2NDQ0OTg2LCJzdWIiOiI4MGQwNWZjNC0yMjc1LTQ4NTYtODBmNy1iYWY2Y2EzMDY5MmN-U1RBR0lOR34yZjU0ZmU2Yy03NTA0LTQzNzItODMzZi0zZjRhNTliOGZlYmIifQ.UzD-l6Zj8awB1n3isn6fi75I7TKNwAgy3wjBgs16GdQ'})

    const session = await cameraKit.createSession()
    document.getElementById('canvas').replaceWith(session.output.live)

    
    const { lenses } = await cameraKit.lensRepository.loadLensGroups(['2d278eb9-9d30-4bb8-8465-1d057363611b'])
    session.applyLens(lenses[0])

    //const { lenses } = await cameraKit.lensRepository.loadLensGroups(['2d278eb9-9d30-4bb8-8465-1d057363611b'])
    //session.applyLens(lenses[0])
    let mediaStream = await navigator.mediaDevices.getUserMedia({
        video: true,
    })

    const source = createMediaStreamSource(mediaStream, {
        transform: Transform2D.MirrorX,
        cameraType: 'front'
    })

    await session.setSource(source)

    session.source.setRenderSize(window.innerWidth,window.innerHeight)

    session.play()
})();