const threeSixtyMain = () => {

    // const panorama = new PANOLENS.ImageLittlePlanet( '../../beksinski/media/img/fieldTest.jpg' );
    const panorama = new PANOLENS.ImagePanorama( '../../beksinski/media/img/fieldTest.jpg' );
    const viewer = new PANOLENS.Viewer();
    viewer.add( panorama );

    var Ambientsound = new Howl({
        src: ['../music/AmbientSound1.mp3'],
        loop: true,
    });
    Ambientsound.play()


}
addEventListener('load', threeSixtyMain);