import { useState } from 'react';
import { uploadModal } from '../../../../services/modal.service';
import styles from "./image.component.module.scss";
import { SketchPicker } from 'react-color';
import reactCSS from 'reactcss'

const ColorChooserComponent = (props: any) => {
    const config: any = {
        displayColorPicker: false,
        color: "#333333",
    };

    const [ state, setState ] = useState(config);
    
    const handleClick = () => {
        setState({ color: state.color, displayColorPicker: !state.displayColorPicker })
    };
    
    const handleClose = () => {
        setState({ color: state.color, displayColorPicker: false })
    };
    
    const handleChange = (color: any) => {
        setState({ color: color.hex, displayColorPicker: state.displayColorPicker })
    };

    const styles: any = reactCSS({
        'default': {
          color: {
            width: '36px',
            height: '14px',
            borderRadius: '2px',
            background: `${ state.color }`,
          },
          swatch: {
            padding: '5px',
            background: '#fff',
            borderRadius: '1px',
            boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
            display: 'inline-block',
            cursor: 'pointer',
          },
          popover: {
            position: 'absolute',
            zIndex: '2',
          },
          cover: {
            position: 'fixed',
            top: '0px',
            right: '0px',
            bottom: '0px',
            left: '0px',
          },
        },
    });

    return (
        <>
            <div>
                <div style={ styles.swatch } onClick={ handleClick }>
                <div style={ styles.color } />
                </div>
                { state.displayColorPicker ? <div style={ styles.popover }>
                <div style={ styles.cover } onClick={ handleClose }/>
                <SketchPicker color={ state.color } onChange={ handleChange } onChangeComplete={ (color) => props.handleChange(color, props.index, "colorchooser") } />
                </div> : null }

            </div>
        </>
    )

}

export default ColorChooserComponent;