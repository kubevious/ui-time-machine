import React, { FC } from 'react';
import { HistoryHierarchyEntry } from '@kubevious/ui-middleware/dist/services/history/types';
import { NodeHistoryChanges } from './node-history-changes';
import cx from 'classnames';

import { app } from '@kubevious/ui-framework';
import { ActionLink, Label, DnLink } from '@kubevious/ui-components';

import { dateToString } from '@kubevious/ui-framework';

import styles from './styles.module.css';

export interface NodeHistoryViewHierarchyProps
{
    dn: string | null;
    entries: HistoryHierarchyEntry[];
    time_machine_actual_snapshot_id : string | null;
    time_machine_target_date : Date | null;
}

export const NodeHistoryViewHierarchy : FC<NodeHistoryViewHierarchyProps> = ({ entries, time_machine_actual_snapshot_id, time_machine_target_date }) => {

    const clickEntry = (entry: HistoryHierarchyEntry) => {
        app.sharedState.set('time_machine_enabled', true)
        app.sharedState.set('time_machine_target_snapshot_id', entry.snapshotId)
        app.sharedState.set('time_machine_target_date', entry.date)
    }

    const myEntries = makeEntries(entries, time_machine_actual_snapshot_id, time_machine_target_date);
    
    return <>
        <table>
            <tbody>
                
            {myEntries.map((x, index) => (
                <tr key={index} 
                    className={cx(styles.row, {[styles.rowAlt] : (index % 2 === 1), [styles.rowTimeMachineActive] : x.isTimeActive })}>
                    {x.data && <>
                        <td className={cx(styles.cell)}>
                            {x.isTimeActive && 
                                <Label color="dark">
                                    {dateToString(x.date)}
                                </Label>
                            }
                            {!x.isTimeActive && 
                                <ActionLink
                                    onClick={() => clickEntry(x.data!)}
                                    >
                                    {dateToString(x.date)}
                                </ActionLink>
                            }
                        </td>
                        <td className={cx(styles.cell)}>

                            <table>
                                <tbody>

                                {x.data.nodes.map((node, index2) => (
                                    <tr key={index2} 
                                        className={cx(styles.row, {[styles.rowAlt] : ((index + index2) % 2 === 1)})}
                                        >
                                        <td className={cx(styles.cell)}>
                                            <DnLink dn={node.dn} />
                                        </td>
                                        <td className={cx(styles.cell)}>
                                            <NodeHistoryChanges item={node} />
                                        </td>
                                    </tr>
                                ))}

                                </tbody>
                            </table>

                            
                        </td>
                    </>}
                    {!x.data && <>
                        <td className={cx(styles.cell)}>
                            <Label color="dark">
                                {dateToString(x.date)}
                            </Label>
                        </td>
                        <td className={cx(styles.cell)}>
                            <Label color="dark">
                                Time Machine Active
                            </Label>
                        </td>
                    </>}
                </tr>
            ))}


            </tbody>
        </table>
    </>
}


function makeEntries(entries: HistoryHierarchyEntry[],
    time_machine_actual_snapshot_id : string | null,
    time_machine_target_date : Date | null) : Entry[]
{
    if (!entries) {
        return [];
    }
    const massaged : Entry[] = entries.map(x => ({ 
        data: x,
        date: new Date(x.date)
    }));
    if (!time_machine_actual_snapshot_id && !time_machine_target_date) {
        return massaged;
    }

    if (time_machine_actual_snapshot_id) {
        for(const x of massaged) {
            if (x.data!.snapshotId === time_machine_actual_snapshot_id) {
                x.isTimeActive = true;
                return massaged;
            }
        }
    }

    if (time_machine_target_date) {
        for(let i = 0; i < massaged.length; i++)
        {
            const x = massaged[i];
            if (time_machine_target_date > x.date) {
                massaged.splice(i, 0, {
                    date: time_machine_target_date,
                    isTimeActive: true
                })
                return massaged;
            }
        }

        massaged.push({
            date: time_machine_target_date,
            isTimeActive: true
        })
    }

    return massaged;
}

interface Entry
{
    date: Date;
    isTimeActive?: boolean;
    data?: HistoryHierarchyEntry;
}