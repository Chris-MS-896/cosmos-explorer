import * as React from "react";
import * as ViewModels from "../../../../Contracts/ViewModels";
import {
  GeospatialConfigType,
  TtlType,
  ChangeFeedPolicyState,
  isDirty,
  IsComponentDirtyResult
} from "../SettingsUtils";
import Explorer from "../../../Explorer";
import { Int32 } from "../../../Panes/Tables/Validators/EntityPropertyValidationCommon";
import {
  Label,
  Text,
  TextField,
  Stack,
  IChoiceGroupOption,
  ChoiceGroup,
  MessageBar,
  MessageBarType
} from "office-ui-fabric-react";
import {
  getTextFieldStyles,
  changeFeedPolicyToolTip,
  subComponentStackProps,
  titleAndInputStackProps,
  getChoiceGroupStyles,
  ttlWarning,
  messageBarStyles
} from "../SettingsRenderUtils";
import { ToolTipLabelComponent } from "./ToolTipLabelComponent";

export interface SubSettingsComponentProps {
  collection: ViewModels.Collection;
  container: Explorer;

  timeToLive: TtlType;
  timeToLiveBaseline: TtlType;

  onTtlChange: (ev?: React.FormEvent<HTMLElement | HTMLInputElement>, option?: IChoiceGroupOption) => void;
  timeToLiveSeconds: number;
  timeToLiveSecondsBaseline: number;
  onTimeToLiveSecondsChange: (
    event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
    newValue?: string
  ) => void;

  geospatialConfigType: GeospatialConfigType;
  geospatialConfigTypeBaseline: GeospatialConfigType;
  onGeoSpatialConfigTypeChange: (
    ev?: React.FormEvent<HTMLElement | HTMLInputElement>,
    option?: IChoiceGroupOption
  ) => void;

  isAnalyticalStorageEnabled: boolean;
  analyticalStorageTtlSelection: TtlType;
  analyticalStorageTtlSelectionBaseline: TtlType;
  onAnalyticalStorageTtlSelectionChange: (
    ev?: React.FormEvent<HTMLElement | HTMLInputElement>,
    option?: IChoiceGroupOption
  ) => void;

  analyticalStorageTtlSeconds: number;
  analyticalStorageTtlSecondsBaseline: number;
  onAnalyticalStorageTtlSecondsChange: (
    event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
    newValue?: string
  ) => void;

  changeFeedPolicyVisible: boolean;
  changeFeedPolicy: ChangeFeedPolicyState;
  changeFeedPolicyBaseline: ChangeFeedPolicyState;
  onChangeFeedPolicyChange: (ev?: React.FormEvent<HTMLElement | HTMLInputElement>, option?: IChoiceGroupOption) => void;
  onSubSettingsSaveableChange: (isSubSettingsSaveable: boolean) => void;
  onSubSettingsDiscardableChange: (isSubSettingsDiscardable: boolean) => void;
}

export class SubSettingsComponent extends React.Component<SubSettingsComponentProps> {
  private shouldCheckComponentIsDirty = true;
  private ttlVisible: boolean;
  private geospatialVisible: boolean;
  private partitionKeyValue: string;
  private partitionKeyName: string;

  constructor(props: SubSettingsComponentProps) {
    super(props);
    this.ttlVisible = (this.props.container && !this.props.container.isPreferredApiCassandra()) || false;
    this.geospatialVisible = this.props.container.isPreferredApiDocumentDB();
    this.partitionKeyValue = "/" + this.props.collection.partitionKeyProperty;
    this.partitionKeyName = this.props.container.isPreferredApiMongoDB() ? "Shard key" : "Partition key";
  }

  componentDidMount(): void {
    this.onComponentUpdate();
  }

  componentDidUpdate(): void {
    this.onComponentUpdate();
  }

  private onComponentUpdate = (): void => {
    if (!this.shouldCheckComponentIsDirty) {
      this.shouldCheckComponentIsDirty = true;
      return;
    }

    const isComponentDirtyResult = this.IsComponentDirty();
    this.props.onSubSettingsSaveableChange(isComponentDirtyResult.isSaveable);
    this.props.onSubSettingsDiscardableChange(isComponentDirtyResult.isDiscardable);

    this.shouldCheckComponentIsDirty = false;
  };

  public IsComponentDirty = (): IsComponentDirtyResult => {
    if (
      (this.props.timeToLive === TtlType.On && !this.props.timeToLiveSeconds) ||
      (this.props.analyticalStorageTtlSelection === TtlType.On && !this.props.analyticalStorageTtlSeconds)
    ) {
      return { isSaveable: false, isDiscardable: true };
    } else if (
      isDirty(this.props.timeToLive, this.props.timeToLiveBaseline) ||
      (this.props.timeToLive === TtlType.On &&
        isDirty(this.props.timeToLiveSeconds, this.props.timeToLiveSecondsBaseline)) ||
      isDirty(this.props.analyticalStorageTtlSelection, this.props.analyticalStorageTtlSelectionBaseline) ||
      (this.props.analyticalStorageTtlSelection === TtlType.On &&
        isDirty(this.props.analyticalStorageTtlSeconds, this.props.analyticalStorageTtlSecondsBaseline)) ||
      isDirty(this.props.geospatialConfigType, this.props.geospatialConfigTypeBaseline) ||
      isDirty(this.props.changeFeedPolicy, this.props.changeFeedPolicyBaseline)
    ) {
      return { isSaveable: true, isDiscardable: true };
    }

    return { isSaveable: false, isDiscardable: false };
  };

  private ttlChoiceGroupOptions: IChoiceGroupOption[] = [
    { key: TtlType.Off, text: "Off" },
    { key: TtlType.OnNoDefault, text: "On (no default)" },
    { key: TtlType.On, text: "On" }
  ];

  private getTtlComponent = (): JSX.Element => (
    <Stack {...titleAndInputStackProps}>
      <ChoiceGroup
        id="timeToLive"
        label="Time to Live"
        selectedKey={this.props.timeToLive}
        options={this.ttlChoiceGroupOptions}
        onChange={this.props.onTtlChange}
        styles={getChoiceGroupStyles(this.props.timeToLive, this.props.timeToLiveBaseline)}
      />
      {isDirty(this.props.timeToLive, this.props.timeToLiveBaseline) && this.props.timeToLive === TtlType.On && (
        <MessageBar messageBarType={MessageBarType.warning} styles={messageBarStyles}>
          {ttlWarning}
        </MessageBar>
      )}
      {this.props.timeToLive === TtlType.On && (
        <TextField
          id="timeToLiveSeconds"
          styles={getTextFieldStyles(this.props.timeToLiveSeconds, this.props.timeToLiveSecondsBaseline)}
          type="number"
          required
          min={1}
          max={Int32.Max}
          value={this.props.timeToLiveSeconds?.toString()}
          onChange={this.props.onTimeToLiveSecondsChange}
          suffix="second(s)"
        />
      )}
    </Stack>
  );

  private analyticalTtlChoiceGroupOptions: IChoiceGroupOption[] = [
    { key: TtlType.Off, text: "Off", disabled: true },
    { key: TtlType.OnNoDefault, text: "On (no default)" },
    { key: TtlType.On, text: "On" }
  ];

  private getAnalyticalStorageTtlComponent = (): JSX.Element => (
    <Stack {...titleAndInputStackProps}>
      <ChoiceGroup
        id="analyticalStorageTimeToLive"
        label="Analytical Storage Time to Live"
        selectedKey={this.props.analyticalStorageTtlSelection}
        options={this.analyticalTtlChoiceGroupOptions}
        onChange={this.props.onAnalyticalStorageTtlSelectionChange}
        styles={getChoiceGroupStyles(
          this.props.analyticalStorageTtlSelection,
          this.props.analyticalStorageTtlSelectionBaseline
        )}
      />
      {this.props.analyticalStorageTtlSelection === TtlType.On && (
        <TextField
          id="analyticalStorageTimeToLiveSeconds"
          styles={getTextFieldStyles(
            this.props.analyticalStorageTtlSeconds,
            this.props.analyticalStorageTtlSecondsBaseline
          )}
          type="number"
          required
          min={1}
          max={Int32.Max}
          value={this.props.analyticalStorageTtlSeconds?.toString()}
          suffix="second(s)"
          onChange={this.props.onAnalyticalStorageTtlSecondsChange}
        />
      )}
    </Stack>
  );

  private geoSpatialConfigTypeChoiceGroupOptions: IChoiceGroupOption[] = [
    { key: GeospatialConfigType.Geography, text: "Geography" },
    { key: GeospatialConfigType.Geometry, text: "Geometry" }
  ];

  private getGeoSpatialComponent = (): JSX.Element => (
    <ChoiceGroup
      id="geoSpatialConfig"
      label="Geospatial Configuration"
      selectedKey={this.props.geospatialConfigType}
      options={this.geoSpatialConfigTypeChoiceGroupOptions}
      onChange={this.props.onGeoSpatialConfigTypeChange}
      styles={getChoiceGroupStyles(this.props.geospatialConfigType, this.props.geospatialConfigTypeBaseline)}
    />
  );

  private changeFeedChoiceGroupOptions: IChoiceGroupOption[] = [
    { key: ChangeFeedPolicyState.Off, text: "Off" },
    { key: ChangeFeedPolicyState.On, text: "On" }
  ];

  private getChangeFeedComponent = (): JSX.Element => {
    const labelId = "settingsV2ChangeFeedLabelId";

    return (
      <Stack>
        <Label id={labelId}>
          <ToolTipLabelComponent label="Change feed log retention policy" toolTipElement={changeFeedPolicyToolTip} />
        </Label>
        <ChoiceGroup
          id="changeFeedPolicy"
          selectedKey={this.props.changeFeedPolicy}
          options={this.changeFeedChoiceGroupOptions}
          onChange={this.props.onChangeFeedPolicyChange}
          styles={getChoiceGroupStyles(this.props.changeFeedPolicy, this.props.changeFeedPolicyBaseline)}
          aria-labelledby={labelId}
        />
      </Stack>
    );
  };

  private getPartitionKeyComponent = (): JSX.Element => (
    <Stack {...titleAndInputStackProps}>
      {this.getPartitionKeyVisible() && (
        <TextField
          label={this.partitionKeyName}
          disabled
          styles={getTextFieldStyles(undefined, undefined)}
          defaultValue={this.partitionKeyValue}
        />
      )}

      {this.isLargePartitionKeyEnabled() && <Text>Large {this.partitionKeyName.toLowerCase()} has been enabled</Text>}
    </Stack>
  );

  public getPartitionKeyVisible = (): boolean => {
    if (
      this.props.container.isPreferredApiCassandra() ||
      this.props.container.isPreferredApiTable() ||
      !this.props.collection.partitionKeyProperty ||
      (this.props.container.isPreferredApiMongoDB() && this.props.collection.partitionKey.systemKey)
    ) {
      return false;
    }
    return true;
  };

  public isLargePartitionKeyEnabled = (): boolean => this.props.collection.partitionKey?.version >= 2;

  public render(): JSX.Element {
    return (
      <Stack {...subComponentStackProps}>
        {this.ttlVisible && this.getTtlComponent()}

        {this.geospatialVisible && this.getGeoSpatialComponent()}

        {this.props.isAnalyticalStorageEnabled && this.getAnalyticalStorageTtlComponent()}

        {this.props.changeFeedPolicyVisible && this.getChangeFeedComponent()}

        {this.getPartitionKeyComponent()}
      </Stack>
    );
  }
}
