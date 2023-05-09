const threeSixtyMain = () => {

    const panorama = new PANOLENS.ImagePanorama( '../../beksinski/media/img/field.jpg' );
    const viewer = new PANOLENS.Viewer();
    viewer.add( panorama );

}
addEventListener('load', threeSixtyMain);