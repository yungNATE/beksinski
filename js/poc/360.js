const threeSixtyMain = () => {

    // const panorama = new PANOLENS.ImageLittlePlanet( '../../beksinski/media/img/fieldTest.jpg' );
    const panorama = new PANOLENS.ImagePanorama( '../../beksinski/media/img/fieldTest.jpg' );
    const viewer = new PANOLENS.Viewer();
    viewer.add( panorama );

}
addEventListener('load', threeSixtyMain);