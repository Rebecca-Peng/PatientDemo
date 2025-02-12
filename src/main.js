import{
   bootstrapCameraKit,
   createMediaStreamSource,
   Transform2D, 
}from '@snap/camera-kit'

(async function (){
    var cameraKit = await bootstrapCameraKit({ apiToken: 'eyJhbGciOiJIUzI1NiIsImtpZCI6IkNhbnZhc1MyU0hNQUNQcm9kIiwidHlwIjoiSldUIn0.eyJhdWQiOiJjYW52YXMtY2FudmFzYXBpIiwiaXNzIjoiY2FudmFzLXMyc3Rva2VuIiwibmJmIjoxNzM0OTg0ODAwLCJzdWIiOiIyMDVhYTNlMy0zZGIxLTQyOWUtOTg1My0wODc2ZDcxYmZiZTl-U1RBR0lOR344ZmY4NTY1ZC1lODFjLTQxNDItYTlhYi1hMmY4ODE3MTUxNmIifQ.IFchVq8Yo7W0YHDn_qPz0H5MHAHEZIjE1FC2YaTLYVc'})

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
