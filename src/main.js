import{
   bootstrapCameraKit,
   createMediaStreamSource,
   Transform2D, 
}from '@snap/camera-kit'

(async function (){
    var cameraKit = await bootstrapCameraKit({ apiToken: 'eyJhbGciOiJIUzI1NiIsImtpZCI6IkNhbnZhc1MyU0hNQUNQcm9kIiwidHlwIjoiSldUIn0.eyJhdWQiOiJjYW52YXMtY2FudmFzYXBpIiwiaXNzIjoiY2FudmFzLXMyc3Rva2VuIiwibmJmIjoxNzM0OTg0ODAwLCJzdWIiOiIyMDVhYTNlMy0zZGIxLTQyOWUtOTg1My0wODc2ZDcxYmZiZTl-UFJPRFVDVElPTn5hOGMzOGU0OC02MDNjLTRmYTItYTlmOS0wNDc5MTg3YjYxNDYifQ.IAmIuzW8KdOlp3NBJu2kCSGIDbMnBFco2Uwy4b_rLjY'})

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
