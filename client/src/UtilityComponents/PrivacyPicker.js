import React from 'react';
import { Button, Dropdown } from 'semantic-ui-react';
import "../styles/css/index.css"

const PrivacyPicker = (props) => {
    return (
        <div className="dropdownChangePrivacy">
            <Button.Group>
                <Dropdown text='Privacy' icon='setting' floating labeled button className='clickButton icon'>
                    <Dropdown.Menu>
                        <Dropdown.Item
                            label={{ color: 'var(--buttonColor)', empty: true, circular: true }}
                            // onClick={() => changeStyle("Modern")}
                            text="Public"
                        />
                        <Dropdown.Item
                            label={{ color: 'var(--primary)', empty: true, circular: true }}
                            // onClick={() => changeStyle("Old-School")}
                            text="Followers Only"
                        />
                        <Dropdown.Item
                            label={{ color: 'var(--accent)', empty: true, circular: true }}
                            // onClick={() => changeStyle("Retro")}
                            text="Private"
                        />
                    </Dropdown.Menu>
                </Dropdown>
            </Button.Group>
        </div>
    );
};
export default PrivacyPicker;