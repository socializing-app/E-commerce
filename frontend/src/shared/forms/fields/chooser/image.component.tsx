import { useState } from 'react';
import { uploadModal } from '../../../../services/modal.service';
import styles from "./image.component.module.scss";

const ImageChooserComponent = (props: any) => {
    const numberRequired = props.field.options.length ? props.field.options[0] : 1;

    const [ show, setShow ] = useState(false);
    const [ images, setImages ] = useState(Array.from({ length: numberRequired }, (image: string) => ""));
    const [ activeIndex, setActiveIndex ] = useState(0);

    const handleImageArrived = (image: string) => {
        setShow(false);

        const updatedImages = images.map((image_: string, i: number) => ( activeIndex === i ) ? image : image_ );

        setImages(updatedImages);
        props.handleChange(updatedImages, props.index, "imagechooser");
    }

    const activateImage = (index: number) => {
        setActiveIndex(index);
        setShow(true);
    }

    return (
        <>
            <div className={styles.placeholder}>{ props.field.placeholder }</div>
            
            <div className={styles.images}>
                { images.map((image: any, index: number) => (
                    <div key={`image-number-${index}`} onClick={() => activateImage(index)} className={styles.image}>
                        { !image && <div className={styles.plus}>+</div> }
                        { image && <img src={image} /> }
                    </div>
                )) }
            </div>

            { uploadModal(show, "Choose your photo",  () => setShow(false), (image: any) => handleImageArrived(image)) }
        </>
    )

}

export default ImageChooserComponent;