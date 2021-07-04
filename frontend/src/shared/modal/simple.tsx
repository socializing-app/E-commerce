import React from "react";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { Modal as ModalProps } from "../../models/modal.model";

const SimpleComponent = ( props: ModalProps ) => {
    const { size, title, bodytext, onHide, onSubmit, closetext, submittext } = props;

    return (
      <Modal {...props} size={size} aria-labelledby="contained-modal-title-vcenter" centered>
        
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            { title }
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <h4>{ title }</h4>
          <p>{ bodytext }</p>
        </Modal.Body>

        <Modal.Footer>
          <Button onClick={ onHide }>{ closetext }</Button>
          <Button onClick={ onSubmit }>{ submittext }</Button>
        </Modal.Footer>

      </Modal>
    );
}

export default SimpleComponent;