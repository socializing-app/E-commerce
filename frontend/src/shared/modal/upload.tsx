import React, { useCallback, useState } from "react";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { Modal as ModalProps } from "../../models/modal.model";
import Cropper from 'react-easy-crop';
import { getCroppedImg } from '../../services/crop.service';
import styles from "./upload.component.module.scss";
import { FileUploader } from "react-drag-drop-files";

const fileTypes = ["JPG", "JPEG", "PNG", "GIF"];

const UploadComponent = ( props: any ) => {
    const { size, title, onHide, onSubmit, closetext, submittext } = props;
    const [crop, setCrop] = useState({ x: 0, y: 0 })
    const [imageSrc, setImageSrc] = React.useState("")
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)
    const [zoom, setZoom] = useState(1);

    const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels)
    }, [])

    const showCroppedImage = useCallback(async () => {
      const croppedImage: any = await getCroppedImg(imageSrc, croppedAreaPixels)
      onSubmit(croppedImage);
      setImageSrc("");
    }, [imageSrc, croppedAreaPixels])

    function readFile(file: any) {
      return new Promise((resolve) => {
        const reader = new FileReader()
        reader.addEventListener('load', () => resolve(reader.result), false)
        reader.readAsDataURL(file)
      })
    }

    const onFileChange = async (file: any) => {
      let imageDataUrl: any = await readFile(file);
      setImageSrc(imageDataUrl);
    }

    return (
      <Modal {...props} size={size} aria-labelledby="contained-modal-title-vcenter" centered>
        
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            { title }
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <FileUploader handleChange={onFileChange} name="file" types={fileTypes} classes={styles.drop_area} />
          
          {imageSrc && (
              <div className={styles.cropContainer}>
                <Cropper image={imageSrc}
                         crop={crop}
                         zoom={zoom}
                         aspect={1 / 1}
                         onCropChange={setCrop}
                         onCropComplete={onCropComplete}
                         onZoomChange={setZoom} />
              </div>
          )}
      
        </Modal.Body>

        <Modal.Footer>
          <Button onClick={ onHide }>{ closetext }</Button>
          <Button onClick={ showCroppedImage }>{ submittext }</Button>
        </Modal.Footer>

      </Modal>
    );
}

export default UploadComponent;