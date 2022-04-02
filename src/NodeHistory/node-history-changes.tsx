import React, { FC } from 'react';
import { HistoryNodeEntryChanges } from '@kubevious/ui-middleware/dist/services/history/types';

import { Label, FlagIcon, MarkerIcon, SeverityBlock } from '@kubevious/ui-components';
import cx from 'classnames';

import styles from './styles.module.css';

export const NodeHistoryChanges: FC<{ item : HistoryNodeEntryChanges }> = ({ item }) => {

    return <>
        <div>
            {item.notPresent && 
                <span>Deleted</span>
            }

            {!item.notPresent && 
                <>
                    <div className={styles.iconsContainer}>
                        {item.alertCount && 
                            <span className={cx(styles.changeSection, styles.alertsWrapper)} >
                                <SeverityBlock errors={item.alertCount.error | 0}
                                               warnings={item.alertCount.warn | 0} 
                                               showZeros
                                               />
                            </span>
                        }

                        {item.flags && item.flags.map(x => 
                            <FlagIcon key={x} flag={x} />
                        )}

                        {item.markers && item.markers.map(x => 
                            <MarkerIcon key={x} marker={x} />
                        )}
                    </div>


                    {item.props && (item.props.length > 0) &&
                        <span className={styles.changeSection}>
                            <Label>
                                Properties: { item.props.join(", ") }
                            </Label>
                        </span>
                    }

                </>
            }

        </div>
    </>;

}