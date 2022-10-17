import moment from 'moment';
import { useState } from 'react';
import { useBoolean, useMount } from 'react-use';

import { CLOUDFLARE_WORKERS_BASE_URI } from '@/utils/common';

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface DayFunnels {
  xValues: string[];
  series: number[][];
  formattedXValues: string[];
}

export interface DayPropsum {
  xValues: string[];
  series: any[][];
  formattedXValues: string[];
}

export interface Meta {
  segmentIndex: number;
}

export interface BinDist {
  tempKey: any[];
  uniques: number;
  sums: number;
  totals: number;
}

export interface Bin {
  start: number;
  end: number;
  bin_dist: BinDist;
}

export interface StepBin {
  bins: Bin[];
}

export interface StepTransTimeDistribution {
  segment_index: number;
  step_bins: StepBin[];
}

export interface AvgPrevStepCount {
  sums: number;
  totals: number;
}

export interface BinDist2 {
  tempKey: any[];
  uniques: number;
  sums: number;
  totals: number;
}

export interface Bin2 {
  start: number;
  end: number;
  bin_dist: BinDist2;
}

export interface StepBin2 {
  bins: Bin2[];
}

export interface StepPrevStepCountDistribution {
  segment_index: number;
  step_bins: StepBin2[];
}

export interface Converted {
  0: any[];
}

export interface Dropoff {
  0: any[];
}

export interface ExcludedDropoff {
  0: any[];
}

export interface ConvertedCounts {
  0: number;
}

export interface DropoffCounts {
  0: number;
}

export interface ExcludedDropoffCounts {
  0: number;
}

export interface ConvertedTotalCounts {
  0: number;
}

export interface DropoffTotalCounts {
  0: number;
}

export interface ExcludedDropoffTotalCounts {
  0: number;
}

export interface DayAvgTransTimes {
  xValues: string[];
  series: number[][];
  formattedXValues: string[];
}

export interface DayMedianTransTimes {
  xValues: string[];
  series: number[][];
  formattedXValues: string[];
}

export interface Datum {
  avgTransTimes: number[];
  cumulative: number[];
  cumulativeRaw: number[];
  dayFunnels: DayFunnels;
  dayPropsum: DayPropsum;
  events: string[];
  groupValue: string;
  medianTransTimes: number[];
  meta: Meta;
  propsum: any[];
  stepByStep: number[];
  stepTransTimeDistribution: StepTransTimeDistribution;
  avgPrevStepCounts: AvgPrevStepCount[];
  medianPrevStepCounts: number[];
  stepPrevStepCountDistribution: StepPrevStepCountDistribution;
  converted: Converted;
  dropoff: Dropoff;
  excludedDropoff: ExcludedDropoff;
  convertedCounts: ConvertedCounts;
  dropoffCounts: DropoffCounts;
  excludedDropoffCounts: ExcludedDropoffCounts;
  convertedTotalCounts: ConvertedTotalCounts;
  dropoffTotalCounts: DropoffTotalCounts;
  excludedDropoffTotalCounts: ExcludedDropoffTotalCounts;
  dayAvgTransTimes: DayAvgTransTimes;
  dayMedianTransTimes: DayMedianTransTimes;
  novaSegmentIndex: number;
}

export interface PVData {
  data: Datum[];
  numSeries: number;
  timeComputed: number;
  wasCached: boolean;
  cacheFreshness: string;
  novaRuntime: number;
  novaRequestDuration: number;
  novaCost: number;
  throttleTime: number;
  minSampleRate: number;
  transformationIds: any[];
  backend: string;
  realtimeDataMissing: boolean;
  timedOutRealtimeData: boolean;
  missedCacheAndNotComputed: boolean;
  partialMergedAndNewUserInformation: boolean;
  prunedResult: boolean;
  hitChunkGroupByLimit: boolean;
  subcluster: number;
  millisSinceComputed: number;
  queryIds: string[];
}

const currentDay = moment().format('YYYYMMDD');
const oneMonthBefore = moment().subtract(29, 'days').format('YYYYMMDD');
export function usePastOneMonthPVData() {
  const [pvData, setPVData] = useState<Datum[]>([]);
  const [isFetchingPVData, toggleFetchingPVData] = useBoolean(false);
  useMount(() => {
    const url = `${CLOUDFLARE_WORKERS_BASE_URI}/pv/?e={%22event_type%22:%22PV_EXPOSURE%22}&start=${oneMonthBefore}&end=${currentDay}`;
    toggleFetchingPVData();
    fetch(url)
      .then((v) => v.json())
      .then((v: PVData) => {
        setPVData(v.data);
      })
      .catch(console.error)
      .finally(toggleFetchingPVData);
  });

  return { pvData, isFetchingPVData };
}
