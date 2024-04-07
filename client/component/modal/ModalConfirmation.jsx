import { Modal } from "@material-ui/core"
import { COLOR_THEME_DARK } from "../../lib/color-help"



function ModalConfirmation({visible, onRequestClosed, content, confirm, cancel}){

    return (
        <Modal open={visible} onClose={onRequestClosed} style={{display: 'flex',justifyContent: 'center',alignItems: 'center'}}>
            <div style={{width: 300, display: 'flex', flexDirection: 'column', borderRadius: 20, 
                padding: 20, backgroundColor: 'white', alignItems: 'center', outline: 'none'}}>
                
                {content}

                <div style={{display: 'flex', width: '100%', marginTop: 10}}>
                    <div style={{borderColor: COLOR_THEME_DARK, display: 'flex', justifyContent: 'center', alignItems: 'center',
                        flex:1, height: 35, marginRight: 10, borderRadius: 20, cursor: 'pointer',
                        borderStyle: 'solid', borderWidth: 2}}
                        onClick={cancel}>
                        <span style={{fontSize: 16, color: COLOR_THEME_DARK, fontWeight: 'bold'}}>Cancel</span>
                    </div>
                    <div style={{background: COLOR_THEME_DARK, display: 'flex', justifyContent: 'center', alignItems: 'center',
                        flex:1, height: 35, marginLeft: 10, borderRadius: 20, cursor: 'pointer',
                        boxShadow: "0px 4px 16px #3ED2C340"}}
                        onClick={confirm}>
                        <span style={{fontSize: 16, color: 'white', fontWeight: 'bold'}}>Confirm</span>
                    </div>
                </div>
            </div>
        </Modal>
    )
}

export default ModalConfirmation