export const TYPE = Object.freeze({ ECO: 0, ECO_EMERG: 1 });

export const CanvasConst = Object.freeze({
    xTransform: '243px',
    yTransform: '78px',
    width: 1000,
    height: 150,
});
export interface SeatInfo {
    type: number,
    x: number,
    y: number,
    yOffset: number
}

export interface RowInfo {
    x: number,
    y: number,
    xOffset: number,
    yOffset: number,
    seats: SeatInfo[],
}

export interface PaxStationInfo {
    name: string,
    rows: RowInfo[],
    simVar: string,
    index: number,
    fill: number,
    stationIndex: number,
    position: number,
}

export interface CargoStationInfo {
    name: string,
    weight: number,
    simVar: string,
    index: number,
    stationIndex: number,
    progressBarWidth: number,
    position: number,
}

export const SeatConstants = Object.freeze({
    [TYPE.ECO]: {
        len: 28.0,
        wid: 23.1,
        padX: 16,
        padY: 0,
        imageX: 39.0,
        imageY: 23.0,
    },
    [TYPE.ECO_EMERG]: {
        len: 28.0,
        wid: 23.1,
        padX: 24,
        padY: 0,
        imageX: 39.0,
        imageY: 23.0,
    },
});

export const Status = Object.freeze({
    Planned: 0,
    Loaded: 1,
});
