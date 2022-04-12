import React from 'react';
import { ClassComponent } from '@kubevious/ui-framework';
import { Button, Label, ScrollbarComponent, ToggleGroup } from '@kubevious/ui-components';
import { NodeHistoryViewNode } from './node-history-view-node';
import { NodeHistoryViewHierarchy } from './node-history-view-hierarchy';
import { QUERY_NODE, QUERY_HIERARCHY, ObjectChangeHistory } from './types';

import styles from './styles.module.css';

export type Props = {};

export interface State {
    dn: string | null;
    time_machine_actual_snapshot_id : string | null;
    time_machine_target_date : Date | null;

    queryType: string,

    result: ObjectChangeHistory | null;
}

export class NodeHistory extends ClassComponent<Props, State>
{
    constructor(props: Props | Readonly<Props>) {
        super(props);

        this.state = {
            dn: null,
            queryType: this.sharedState.get<string>('change_history_query_type', QUERY_NODE),
            result: null,
            time_machine_actual_snapshot_id : null,
            time_machine_target_date : null,
        };

        this._loadMore = this._loadMore.bind(this);
    }

    componentDidMount(): void {

        this.subscribeToSharedState('selected_object_history', (selected_object_history: ObjectChangeHistory) => {
            this.setState({ result: selected_object_history || null });
        });

        this.subscribeToSharedState('selected_dn', (selected_dn: string) => {
            this.setState({ dn: selected_dn || null });
        });

        this.subscribeToSharedState(
            ['time_machine_enabled',
             'time_machine_actual_snapshot_id',
             'time_machine_target_date'],
        ({ time_machine_enabled, 
           time_machine_actual_snapshot_id,
           time_machine_target_date }) => {
            if (time_machine_enabled) {
                this.setState({ 
                    time_machine_actual_snapshot_id : time_machine_actual_snapshot_id,
                    time_machine_target_date : new Date(time_machine_target_date),
                });
            } else {
                this.setState({ 
                    time_machine_actual_snapshot_id : null,
                    time_machine_target_date : null,
                });
            }
        });
    }

    private _loadMore()
    {
        const nextToken = this.state?.result?.nextToken;
        if (!nextToken) {
            return;
        }

        this.sharedState.set('change_history_next_token', nextToken);
    }

    render() {

        return <>

            {!this.state.dn && 
                <div className={styles.emptyContainer}>
                    <Label text="No object selected"
                        color="faded"
                        size="large"
                        />
                    
                </div>
            }
        
            {this.state.dn && 
                <div className={styles.mainContainer}>
                    <div className={styles.mainContent}>
                        <ScrollbarComponent>
                            {(this.state.queryType === QUERY_NODE) && (this.state.result) &&
                                <NodeHistoryViewNode 
                                    dn={this.state.dn}
                                    entries={this.state.result.nodeEntries}
                                    time_machine_actual_snapshot_id={this.state.time_machine_actual_snapshot_id}
                                    time_machine_target_date={this.state.time_machine_target_date} 
                                    />
                            }

                            {(this.state.queryType === QUERY_HIERARCHY) && (this.state.result) &&
                                <NodeHistoryViewHierarchy 
                                    dn={this.state.dn}
                                    entries={this.state.result.hierarchyEntries}
                                    time_machine_actual_snapshot_id={this.state.time_machine_actual_snapshot_id}
                                    time_machine_target_date={this.state.time_machine_target_date} 
                                    />
                            }

                            {this.state.result && this.state.result.nextToken && 
                                <div className={styles.loadMoreContainer}>
                                    <Button onClick={() => this._loadMore()} type='ghost' >
                                    Load More
                                    </Button>                                
                                </div>
                            } 
                        </ScrollbarComponent>
                    </div>

                    <div className={styles.groupOptions}>
                        <ToggleGroup
                            items={[ QUERY_NODE, QUERY_HIERARCHY ]}
                            selectedItem={this.state.queryType}
                            onSelectionChange={(x) => {
                                this.sharedState.set('change_history_query_type', x);
                                this.sharedState.set('change_history_next_token', null);
                                this.setState({ queryType: x});
                            }}
                            >
                        </ToggleGroup>
                    </div>
                </div>
            }

        </>
    }
}
