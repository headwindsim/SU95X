/* eslint-disable max-len */
import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import {
    ArrowLeftRight,
    BoxArrowRight,
    BriefcaseFill,
    CloudArrowDown,
    PersonFill,
    StopCircleFill,
} from 'react-bootstrap-icons';
import { useSimVar } from '@instruments/common/simVars';
import { Units } from '@shared/units';
import { usePersistentNumberProperty, usePersistentProperty } from '@instruments/common/persistence';
import { BitFlags } from '@shared/bitFlags';
import { useBitFlags } from '@instruments/common/bitFlags';
import { round } from 'lodash';
import { CargoWidget } from './Seating/CargoWidget';
import { ChartWidget } from './Chart/ChartWidget';
import { CargoStationInfo, PaxStationInfo } from './Seating/Constants';
import { t } from '../../../translation';
import { TooltipWrapper } from '../../../UtilComponents/TooltipWrapper';
import { SimpleInput } from '../../../UtilComponents/Form/SimpleInput/SimpleInput';
import Loadsheet from './Loadsheet/su95lr.json';
import Card from '../../../UtilComponents/Card/Card';
import { SelectGroup, SelectItem } from '../../../UtilComponents/Form/Select';
import { SeatMapWidget } from './Seating/SeatMapWidget';
import { isSimbriefDataLoaded } from '../../../Store/features/simBrief';
import { PromptModal, useModals } from '../../../UtilComponents/Modals/Modals';
import { useAppSelector } from '../../../Store/store';

export const Payload = () => {
    const { usingMetric } = Units;
    const { showModal } = useModals();

    const massUnitForDisplay = usingMetric ? 'KGS' : 'LBS';

    const simbriefDataLoaded = isSimbriefDataLoaded();
    const [boardingStarted, setBoardingStarted] = useSimVar('L:A32NX_BOARDING_STARTED_BY_USR', 'Bool', 200);
    const [boardingRate, setBoardingRate] = usePersistentProperty('CONFIG_BOARDING_RATE', 'REAL');
    const [paxWeight, setPaxWeight] = useSimVar('L:A32NX_WB_PER_PAX_WEIGHT', 'Number', 200);
    const [paxBagWeight, setPaxBagWeight] = useSimVar('L:A32NX_WB_PER_BAG_WEIGHT', 'Number', 200);
    const [galToKg] = useSimVar('FUEL WEIGHT PER GALLON', 'kilograms', 2_000);
    const [destEfob] = useSimVar('L:A32NX_DESTINATION_FUEL_ON_BOARD', 'Kilograms', 5_000);

    const [emptyWeight] = useSimVar('A:EMPTY WEIGHT', usingMetric ? 'Kilograms' : 'Pounds', 2_000);

    const [paxA] = useSimVar('L:SU95_PAX_TOTAL_ROWS_1_4', 'Number');
    const [paxB] = useSimVar('L:SU95_PAX_TOTAL_ROWS_5_8', 'Number');
    const [paxC] = useSimVar('L:SU95_PAX_TOTAL_ROWS_9_12', 'Number');
    const [paxD] = useSimVar('L:SU95_PAX_TOTAL_ROWS_13_16', 'Number');
    const [paxE] = useSimVar('L:SU95_PAX_TOTAL_ROWS_17_20', 'Number');

    const pax = [paxA, paxB, paxC, paxD, paxE];

    const [paxADesired, setPaxADesired] = useSimVar('L:SU95_PAX_TOTAL_ROWS_1_4_DESIRED', 'number');
    const [paxBDesired, setPaxBDesired] = useSimVar('L:SU95_PAX_TOTAL_ROWS_5_8_DESIRED', 'number');
    const [paxCDesired, setPaxCDesired] = useSimVar('L:SU95_PAX_TOTAL_ROWS_9_12_DESIRED', 'number');
    const [paxDDesired, setPaxDDesired] = useSimVar('L:SU95_PAX_TOTAL_ROWS_13_16_DESIRED', 'number');
    const [paxEDesired, setPaxEDesired] = useSimVar('L:SU95_PAX_TOTAL_ROWS_17_20_DESIRED', 'number');

    const [stationSize, setStationLen] = useState<number[]>([]);
    const totalPax = useMemo(() => pax && pax.length > 0 && pax.reduce((a, b) => a + b), [...pax]);
    const maxPax = useMemo(() => ((stationSize && stationSize.length > 0) ? stationSize.reduce((a, b) => a + b) : -1), [stationSize]);

    const [aFlags, setAFlags] = useBitFlags('PAX_FLAGS_A');
    const [bFlags, setBFlags] = useBitFlags('PAX_FLAGS_B');
    const [cFlags, setCFlags] = useBitFlags('PAX_FLAGS_C');
    const [dFlags, setDFlags] = useBitFlags('PAX_FLAGS_D');
    const [eFlags, setEFlags] = useBitFlags('PAX_FLAGS_E');

    const paxDesired = [paxADesired, paxBDesired, paxCDesired, paxDDesired, paxEDesired];
    const [setPaxDesired] = useState([setPaxADesired, setPaxBDesired, setPaxCDesired, setPaxDDesired, setPaxEDesired]);
    const totalPaxDesired = useMemo(() => (paxDesired && paxDesired.length > 0 && paxDesired.reduce((a, b) => parseInt(a) + parseInt(b))), [...paxDesired]);

    const [aFlagsDesired, setAFlagsDesired] = useBitFlags('PAX_FLAGS_A_DESIRED');
    const [bFlagsDesired, setBFlagsDesired] = useBitFlags('PAX_FLAGS_B_DESIRED');
    const [cFlagsDesired, setCFlagsDesired] = useBitFlags('PAX_FLAGS_C_DESIRED');
    const [dFlagsDesired, setDFlagsDesired] = useBitFlags('PAX_FLAGS_D_DESIRED');
    const [eFlagsDesired, setEFlagsDesired] = useBitFlags('PAX_FLAGS_E_DESIRED');

    const activeFlags = [aFlags, bFlags, cFlags, dFlags, eFlags];
    const desiredFlags = [aFlagsDesired, bFlagsDesired, cFlagsDesired, dFlagsDesired, eFlagsDesired];
    const setActiveFlags = useMemo(() => [setAFlags, setBFlags, setCFlags, setDFlags, setEFlags], []);
    const setDesiredFlags = useMemo(() => [setAFlagsDesired, setBFlagsDesired, setCFlagsDesired, setDFlagsDesired, setEFlagsDesired], []);

    const [clicked, setClicked] = useState(false);

    const [fwdBag] = useSimVar('L:SU95_CARGO_FWD_BAGGAGE', 'Number', 200);
    const [aftCont] = useSimVar('L:SU95_CARGO_AFT_BAGGAGE_1', 'Number', 200);
    const [aftBag] = useSimVar('L:SU95_CARGO_AFT_BAGGAGE_2', 'Number', 200);
    const [aftBulk] = useSimVar('L:SU95_CARGO_AFT_BULK_LOOSE', 'Number', 200);

    const cargo = [fwdBag, aftCont, aftBag, aftBulk];

    const [fwdBagDesired, setFwdBagDesired] = useSimVar('L:SU95_CARGO_FWD_BAGGAGE_DESIRED', 'Number', 200);
    const [aftContDesired, setAftContDesired] = useSimVar('L:SU95_CARGO_AFT_BAGGAGE_1_DESIRED', 'Number', 200);
    const [aftBagDesired, setAftBagDesired] = useSimVar('L:SU95_CARGO_AFT_BAGGAGE_2_DESIRED', 'Number', 200);
    const [aftBulkDesired, setAftBulkDesired] = useSimVar('L:SU95_CARGO_AFT_BULK_LOOSE_DESIRED', 'Number', 200);

    const cargoDesired = [fwdBagDesired, aftContDesired, aftBagDesired, aftBulkDesired];
    const setCargoDesired = useMemo(() => [setFwdBagDesired, setAftContDesired, setAftBagDesired, setAftBulkDesired], []);
    const totalCargoDesired = useMemo(() => ((cargoDesired && cargoDesired.length > 0) ? cargoDesired.reduce((a, b) => parseInt(a) + parseInt(b)) : -1), [...cargoDesired, ...paxDesired]);

    const [cargoStationSize, setCargoStationLen] = useState<number[]>([]);

    const totalCargo = useMemo(() => ((cargo && cargo.length > 0) ? cargo.reduce((a, b) => parseInt(a) + parseInt(b)) : -1), [...cargo, ...pax]);
    const maxCargo = useMemo(() => ((cargoStationSize && cargoStationSize.length > 0) ? cargoStationSize.reduce((a, b) => a + b) : -1), [cargoStationSize]);

    const [centerCurrent] = useSimVar('FUEL TANK CENTER QUANTITY', 'Gallons', 2_000);
    const [LInnCurrent] = useSimVar('FUEL TANK LEFT MAIN QUANTITY', 'Gallons', 2_000);
    const [LOutCurrent] = useSimVar('FUEL TANK LEFT AUX QUANTITY', 'Gallons', 2_000);
    const [RInnCurrent] = useSimVar('FUEL TANK RIGHT MAIN QUANTITY', 'Gallons', 2_000);
    const [ROutCurrent] = useSimVar('FUEL TANK RIGHT AUX QUANTITY', 'Gallons', 2_000);

    const fuel = [centerCurrent, LInnCurrent, LOutCurrent, RInnCurrent, ROutCurrent];

    // Units
    // Weight/CG
    const [zfw, setZfw] = useState(0);
    const [zfwCg, setZfwCg] = useState(0);
    const [zfwDesired, setZfwDesired] = useState(0);
    const [zfwDesiredCg, setZfwDesiredCg] = useState(0);
    const [totalWeight, setTotalWeight] = useState(emptyWeight);
    const [cg, setCg] = useState(25);
    const [totalDesiredWeight, setTotalDesiredWeight] = useState(0);
    const [desiredCg, setDesiredCg] = useState(0);
    const [mlw, setMlw] = useState(0);
    const [mlwCg, setMlwCg] = useState(0);
    const [mlwDesired, setMlwDesired] = useState(0);
    const [mlwDesiredCg, setMlwDesiredCg] = useState(0);

    const [seatMap] = useState<PaxStationInfo[]>(Loadsheet.seatMap);
    const [cargoMap] = useState<CargoStationInfo[]>(Loadsheet.cargoMap);

    const totalCurrentGallon = useMemo(() => round(Math.max(LInnCurrent + LOutCurrent + RInnCurrent + ROutCurrent + centerCurrent, 0)), [fuel]);

    const [showSimbriefButton, setShowSimbriefButton] = useState(false);
    const simbriefUnits = useAppSelector((state) => state.simbrief.data.units);
    const simbriefBagWeight = parseInt(useAppSelector((state) => state.simbrief.data.weights.bagWeight));
    const simbriefPaxWeight = parseInt(useAppSelector((state) => state.simbrief.data.weights.passengerWeight));
    const simbriefPax = parseInt(useAppSelector((state) => state.simbrief.data.weights.passengerCount));
    const simbriefBag = parseInt(useAppSelector((state) => state.simbrief.data.weights.bagCount));
    const simbriefFreight = parseInt(useAppSelector((state) => state.simbrief.data.weights.freight));

    // GSX
    const [gsxPayloadSyncEnabled] = usePersistentNumberProperty('GSX_PAYLOAD_SYNC', 0);
    const [_, setGsxNumPassengers] = useSimVar('L:FSDT_GSX_NUMPASSENGERS', 'Number');
    const [gsxBoardingState] = useSimVar('L:FSDT_GSX_BOARDING_STATE', 'Number');
    const [gsxDeBoardingState] = useSimVar('L:FSDT_GSX_DEBOARDING_STATE', 'Number');
    const gsxStates = {
        AVAILABLE: 1,
        NOT_AVAILABLE: 2,
        BYPASSED: 3,
        REQUESTED: 4,
        PERFORMING: 5,
        COMPLETED: 6,
    };

    const setSimBriefValues = () => {
        if (simbriefUnits === 'kgs') {
            const perBagWeight = Units.kilogramToUser(simbriefBagWeight);
            setPaxBagWeight(perBagWeight);
            setPaxWeight(Units.kilogramToUser(simbriefPaxWeight));
            setTargetPax(simbriefPax > maxPax ? maxPax : simbriefPax);
            setTargetCargo(simbriefBag, Units.kilogramToUser(simbriefFreight), perBagWeight);
        } else {
            const perBagWeight = Units.poundToUser(simbriefBagWeight);
            setPaxBagWeight(perBagWeight);
            setPaxWeight(Units.poundToUser(simbriefPaxWeight));
            setTargetPax(simbriefPax);
            setTargetCargo(simbriefBag, Units.poundToUser(simbriefFreight), perBagWeight);
        }
    };

    const [busDC2] = useSimVar('L:A32NX_ELEC_DC_2_BUS_IS_POWERED', 'Bool', 2_000);
    const [busDCHot1] = useSimVar('L:A32NX_ELEC_DC_HOT_1_BUS_IS_POWERED', 'Bool', 2_000);
    const [simGroundSpeed] = useSimVar('GPS GROUND SPEED', 'knots', 2_000);
    const [isOnGround] = useSimVar('SIM ON GROUND', 'Bool', 2_000);
    const [eng1Running] = useSimVar('ENG COMBUSTION:1', 'Bool', 2_000);
    const [eng2Running] = useSimVar('ENG COMBUSTION:2', 'Bool', 2_000);
    const [coldAndDark, setColdAndDark] = useState<boolean>(true);

    const returnSeats = useCallback((stationIndex: number, empty: boolean, flags: BitFlags[]): number[] => {
        const seats: number[] = [];
        const bitFlags: BitFlags = flags[stationIndex];
        for (let seatId = 0; seatId < stationSize[stationIndex]; seatId++) {
            if (!empty && bitFlags.getBitIndex(seatId)) {
                seats.push(seatId);
            } else if (empty && !bitFlags.getBitIndex(seatId)) {
                seats.push(seatId);
            }
        }
        return seats;
    }, [...desiredFlags, ...activeFlags]);

    const returnNumSeats = useCallback((stationIndex: number, empty: boolean, flags: BitFlags[]): number => {
        let count = 0;
        const bitFlags: BitFlags = flags[stationIndex];
        for (let seatId = 0; seatId < stationSize[stationIndex]; seatId++) {
            if (!empty && bitFlags.getBitIndex(seatId)) {
                count++;
            } else if (empty && !bitFlags.getBitIndex(seatId)) {
                count++;
            }
        }
        return count;
    }, [...desiredFlags, ...activeFlags]);

    const chooseSeats = useCallback((stationIndex: number, choices: number[], numChoose: number) => {
        const bitFlags: BitFlags = activeFlags[stationIndex];
        for (let i = 0; i < numChoose; i++) {
            if (choices.length > 0) {
                const chosen = ~~(Math.random() * choices.length);
                bitFlags.toggleBitIndex(choices[chosen]);
                choices.splice(chosen, 1);
            }
        }
        setActiveFlags[stationIndex](bitFlags);
    }, [...pax, ...activeFlags]);

    const chooseDesiredSeats = useCallback((stationIndex: number, choices: number[], numChoose: number) => {
        const bitFlags: BitFlags = desiredFlags[stationIndex];
        for (let i = 0; i < numChoose; i++) {
            if (choices.length > 0) {
                const chosen = ~~(Math.random() * choices.length);
                bitFlags.toggleBitIndex(choices[chosen]);
                choices.splice(chosen, 1);
            }
        }
        setDesiredFlags[stationIndex](bitFlags);
    }, [...paxDesired, ...desiredFlags]);

    const calculateSeatOptions = useCallback((stationIndex: number, increase: boolean): number[] => {
        const plannedSeats = returnSeats(stationIndex, increase, desiredFlags);
        const activeSeats = returnSeats(stationIndex, !increase, activeFlags);

        const intersection = activeSeats.filter((element) => plannedSeats.includes(element));
        return intersection;
    }, [...activeFlags, ...desiredFlags]);

    const setTargetPax = useCallback((numOfPax: number) => {
        setGsxNumPassengers(numOfPax);

        if (!stationSize || numOfPax === totalPaxDesired || numOfPax > maxPax || numOfPax < 0) return;

        let paxRemaining = numOfPax;

        const fillStation = (stationIndex: number, percent: number, paxToFill: number) => {
            const pax = Math.min(Math.trunc(percent * paxToFill), stationSize[stationIndex]);
            setPaxDesired[stationIndex](pax);
            paxRemaining -= pax;

            const paxCount = returnNumSeats(stationIndex, false, activeFlags);
            const seats: number[] = returnSeats(stationIndex, pax[stationIndex] > paxCount, activeFlags);
            chooseDesiredSeats(stationIndex, seats, Math.abs(paxCount - pax[stationIndex]));
        };

        for (let i = pax.length - 1; i > 0; i--) {
            fillStation(i, seatMap[i].fill, numOfPax);
        }
        fillStation(0, 1, paxRemaining);
    }, [...paxDesired, totalPaxDesired, maxPax, ...stationSize, ...seatMap]);

    const setTargetCargo = useCallback((numberOfPax: number, freight: number, perBagWeight: number = paxBagWeight) => {
        const bagWeight = numberOfPax * perBagWeight;
        const loadableCargoWeight = Math.min(bagWeight + Math.round(freight), maxCargo);

        let remainingWeight = loadableCargoWeight;

        async function fillCargo(station: number, percent: number, loadableCargoWeight: number) {
            const c = Math.round(percent * loadableCargoWeight);
            remainingWeight -= c;
            setCargoDesired[station](c);
        }

        for (let i = cargoDesired.length - 1; i > 0; i--) {
            fillCargo(i, cargoStationSize[i] / maxCargo, loadableCargoWeight);
        }
        fillCargo(0, 1, remainingWeight);
    }, [...cargoDesired, paxBagWeight, ...cargoStationSize]);

    const calculatePaxMoment = useCallback(() => {
        let paxMoment = 0;
        pax.forEach((station, i) => {
            paxMoment += station * paxWeight * seatMap[i].position;
        });
        return paxMoment;
    }, [paxWeight, ...pax, seatMap]);

    const calculatePaxDesiredMoment = useCallback(() => {
        let paxMoment = 0;
        paxDesired.forEach((station, i) => {
            paxMoment += station * paxWeight * seatMap[i].position;
        });
        return paxMoment;
    }, [paxWeight, ...paxDesired, seatMap]);

    const calculateCargoMoment = useCallback(() => {
        let cargoMoment = 0;
        cargo.forEach((station, i) => {
            cargoMoment += station * cargoMap[i].position;
        });
        return cargoMoment;
    }, [...cargo, cargoMap]);

    const calculateCargoDesiredMoment = useCallback(() => {
        let cargoMoment = 0;
        cargoDesired.forEach((station, i) => {
            cargoMoment += station * cargoMap[i].position;
        });
        return cargoMoment;
    }, [...cargoDesired, cargoMap]);

    const calculateCg = useCallback((mass: number, moment: number) => -100 * ((moment / mass - Loadsheet.specs.leMacZ) / Loadsheet.specs.macSize), []);

    const processZfw = useCallback((newZfw) => {
        let paxCargoWeight = newZfw - emptyWeight;

        // Load pax first
        const pWeight = paxWeight + paxBagWeight;
        const newPax = Math.min(Math.round(paxCargoWeight / pWeight), maxPax);

        paxCargoWeight -= newPax * pWeight;
        const newCargo = Math.min(paxCargoWeight, maxCargo);

        setTargetPax(newPax);
        setTargetCargo(newPax, newCargo);
    }, [emptyWeight, paxWeight, paxBagWeight, maxPax, maxCargo]);

    const onClickCargo = useCallback((cargoStation, e) => {
        if (gsxPayloadSyncEnabled === 1 && boardingStarted) {
            return;
        }
        const cargoPercent = Math.min(Math.max(0, e.nativeEvent.offsetX / cargoMap[cargoStation].progressBarWidth), 1);
        setCargoDesired[cargoStation](Math.round(Units.kilogramToUser(cargoMap[cargoStation].weight) * cargoPercent));
    }, [cargoMap]);

    const onClickSeat = useCallback((station: number, seatId: number) => {
        if (gsxPayloadSyncEnabled === 1 && boardingStarted) {
            return;
        }
        setClicked(true);
        let newPax = totalPaxDesired;
        // TODO FIXME: This calculation does not work correctly if user clicks on many seats in rapid succession
        const freight = Math.max(totalCargoDesired - totalPaxDesired * paxBagWeight, 0);
        const bitFlags: BitFlags = desiredFlags[station];

        if (bitFlags.getBitIndex(seatId)) {
            newPax -= 1;
            setPaxDesired[station](Math.max(paxDesired[station] - 1, 0));
        } else {
            newPax += 1;
            setPaxDesired[station](Math.min(paxDesired[station] + 1, stationSize[station]));
        }

        setTargetCargo(newPax, freight);
        bitFlags.toggleBitIndex(seatId);
        setDesiredFlags[station](bitFlags);
        setTimeout(() => setClicked(false), 500);
    }, [
        totalPaxDesired, paxBagWeight,
        totalCargoDesired, totalPaxDesired,
        ...cargoDesired, ...paxDesired,
        ...desiredFlags, ...stationSize,
    ]);

    const handleDeboarding = () => {
        if (!boardingStarted) {
            showModal(
                <PromptModal
                    title={`${t('Ground.Payload.DeboardConfirmationTitle')}`}
                    bodyText={`${t('Ground.Payload.DeboardConfirmationBody')}`}
                    confirmText={`${t('Ground.Payload.DeboardConfirmationConfirm')}`}
                    cancelText={`${t('Ground.Payload.DeboardConfirmationCancel')}`}
                    onConfirm={() => {
                        setTargetPax(totalPaxDesired < totalPax ? totalPaxDesired : 0);
                        setTargetCargo(totalPaxDesired < totalPax ? totalPaxDesired : 0, totalCargoDesired < totalCargo ? totalCargoDesired : 0);
                        setBoardingStarted(true);
                    }}
                />,
            );
        }
        setBoardingStarted(false);
    };

    const calculateBoardingTime = useMemo(() => {
        // factors taken from flybywire-aircraft-a320-neo/html_ui/Pages/A32NX_Core/A32NX_Boarding.js line 175+
        let boardingRateMultiplier = 0;
        if (boardingRate === 'REAL') {
            boardingRateMultiplier = 5;
        } else if (boardingRate === 'FAST') {
            boardingRateMultiplier = 1;
        }

        // value taken from flybywire-aircraft-a320-neo/html_ui/Pages/A32NX_Core/A32NX_Boarding.js line 210
        const cargoWeightPerWeightStep = 60;

        const differentialPax = Math.abs(totalPaxDesired - totalPax);
        const differentialCargo = Math.abs(totalCargoDesired - totalCargo);

        const estimatedPaxBoardingSeconds = differentialPax * boardingRateMultiplier;
        const estimatedCargoLoadingSeconds = (differentialCargo / cargoWeightPerWeightStep) * boardingRateMultiplier;

        return Math.max(estimatedPaxBoardingSeconds, estimatedCargoLoadingSeconds);
    }, [totalPaxDesired, totalPax, totalCargoDesired, totalCargo, boardingRate]);

    const boardingStatusClass = useMemo(() => {
        if (!boardingStarted) {
            return 'text-theme-highlight';
        }
        return (totalPaxDesired * paxWeight + totalCargoDesired) >= (totalPax * paxWeight + totalCargo) ? 'text-green-500' : 'text-yellow-500';
    }, [boardingStarted, paxWeight, totalPaxDesired, totalCargoDesired, totalPax, totalCargo]);

    // Init
    useEffect(() => {
        if (paxWeight === 0) {
            setPaxWeight(Math.round(Units.kilogramToUser(Loadsheet.specs.pax.defaultPaxWeight)));
        }
        if (paxBagWeight === 0) {
            setPaxBagWeight(Math.round(Units.kilogramToUser(Loadsheet.specs.pax.defaultBagWeight)));
        }
    }, []);

    // Set Cold and Dark State
    useEffect(() => {
        if (simGroundSpeed > 0.1 || eng1Running || eng2Running || !isOnGround || (!busDC2 && !busDCHot1)) {
            setColdAndDark(false);
        } else {
            setColdAndDark(true);
        }
    }, [simGroundSpeed, eng1Running, eng2Running, isOnGround, busDC2, busDCHot1]);

    useEffect(() => {
        if (boardingRate !== 'INSTANT') {
            if (!coldAndDark) {
                setBoardingRate('INSTANT');
            }
        }
    }, [coldAndDark, boardingRate]);

    // Init the seating map
    useEffect(() => {
        const stationSize: number[] = [];
        for (let i = 0; i < seatMap.length; i++) {
            stationSize.push(0);
        }
        seatMap.forEach((station, i) => {
            station.rows.forEach((row) => {
                row.seats.forEach(() => {
                    stationSize[i]++;
                });
            });
        });
        setStationLen(stationSize);
    }, [seatMap]);

    // Init the cargo map
    useEffect(() => {
        const cargoSize: number[] = [];
        for (let i = 0; i < cargoMap.length; i++) {
            cargoSize.push(0);
        }
        cargoMap.forEach((station) => {
            cargoSize[station.index] = Units.kilogramToUser(station.weight);
        });
        setCargoStationLen(cargoSize);
    }, [cargoMap]);

    // Check that pax data and bitflags are valid
    useEffect(() => {
        pax.forEach((stationPaxNum: number, stationIndex: number) => {
            const paxCount = returnNumSeats(stationIndex, false, activeFlags);
            if (stationPaxNum === 0 && paxCount !== stationPaxNum) {
                setActiveFlags[stationIndex](new BitFlags(0));
            }
        });

        paxDesired.forEach((stationPaxNum, stationIndex) => {
            const paxCount = returnNumSeats(stationIndex, false, desiredFlags);
            if (stationPaxNum === 0 && paxCount !== stationPaxNum) {
                setDesiredFlags[stationIndex](new BitFlags(0));
            }
        });
        if (!boardingStarted) {
            setTargetPax(totalPax);
            setTargetCargo(0, totalCargo);
        }
    }, [stationSize]);

    // Adjusted desired passenger seating layout to match station passenger count on change
    useEffect(() => {
        paxDesired.forEach((stationNumPax, stationIndex) => {
            const paxCount = returnNumSeats(stationIndex, false, desiredFlags);
            if (!clicked && stationNumPax !== paxCount) {
                const seatOptions = calculateSeatOptions(stationIndex, stationNumPax > paxCount);
                const seatDelta = Math.abs(paxCount - stationNumPax);

                if (seatOptions.length >= seatDelta) {
                    chooseDesiredSeats(stationIndex, seatOptions, seatDelta);
                } else if (seatOptions.length && seatOptions.length < seatDelta) {
                    // Fallback if we don't have enough seat options using desired as reference
                    const leftOver = seatDelta - seatOptions.length;
                    chooseDesiredSeats(stationIndex, seatOptions, seatOptions.length);
                    const seats: number[] = returnSeats(stationIndex, stationNumPax > paxCount, desiredFlags);
                    chooseDesiredSeats(stationIndex, seats, leftOver);
                } else {
                    // Fallback if no seat options using desired as reference
                    const seats: number[] = returnSeats(stationIndex, stationNumPax > paxCount, desiredFlags);
                    chooseDesiredSeats(stationIndex, seats, seatDelta);
                }
            }
        });
    }, [...paxDesired]);

    // Adjust actual passenger seating layout to match station passenger count on change
    useEffect(() => {
        pax.forEach((stationNumPax: number, stationIndex: number) => {
            const paxCount = returnNumSeats(stationIndex, false, activeFlags);
            if (!clicked && stationNumPax !== paxCount) {
                const seatOptions = calculateSeatOptions(stationIndex, stationNumPax < paxCount);
                const seatDelta = Math.abs(paxCount - stationNumPax);
                if (seatOptions.length >= seatDelta) {
                    chooseSeats(stationIndex, seatOptions, seatDelta);
                } else if (seatOptions.length && seatOptions.length < seatDelta) {
                    // Fallback if we don't have enough seat options using desired as reference
                    const leftOver = seatDelta - seatOptions.length;
                    chooseSeats(stationIndex, seatOptions, seatOptions.length);
                    const seats: number[] = returnSeats(stationIndex, stationNumPax > paxCount, activeFlags);
                    chooseSeats(stationIndex, seats, leftOver);
                } else {
                    // Fallback if no seat options using desired as reference
                    const seats: number[] = returnSeats(stationIndex, stationNumPax > paxCount, activeFlags);
                    chooseSeats(stationIndex, seats, seatDelta);
                }
            }
        });
    }, [...pax]);

    useEffect(() => {
        pax.forEach((stationNumPax: number, stationIndex: number) => {
            // Sync active to desired layout if pax is equal to desired
            if (stationNumPax === parseInt(paxDesired[stationIndex])) {
                setActiveFlags[stationIndex](desiredFlags[stationIndex]);
            }
        });
    }, [boardingStarted]);

    useEffect(() => {
        if (gsxPayloadSyncEnabled === 1) {
            switch (gsxBoardingState) {
            // If boarding has been requested, performed or completed
            case gsxStates.REQUESTED:
            case gsxStates.PERFORMING:
            case gsxStates.COMPLETED:
                setBoardingStarted(true);
                break;
            default:
                break;
            }
        }
    }, [gsxBoardingState]);

    useEffect(() => {
        if (gsxPayloadSyncEnabled === 1) {
            switch (gsxDeBoardingState) {
            case gsxStates.REQUESTED:
                // If Deboarding has been requested, set target pax to 0 for boarding backend
                setTargetPax(0);
                setTargetCargo(0, 0);
                setBoardingStarted(true);
                break;
            case gsxStates.PERFORMING:
                // If deboarding is being performed
                setBoardingStarted(true);
                break;
            case gsxStates.COMPLETED:
                // If deboarding is completed
                setBoardingStarted(false);
                break;
            default:
                break;
            }
        }
    }, [gsxDeBoardingState]);

    useEffect(() => {
        const simbriefStatus = (simbriefDataLoaded
            && (
                simbriefPax !== totalPaxDesired
                || simbriefFreight + simbriefBag * simbriefBagWeight !== totalCargoDesired
                || simbriefPaxWeight !== paxWeight
                || simbriefBagWeight !== paxBagWeight
            )
        );

        if (gsxPayloadSyncEnabled === 1) {
            if (boardingStarted) {
                setShowSimbriefButton(false);
                return;
            }

            setShowSimbriefButton(simbriefStatus);
            return;
        }
        setShowSimbriefButton(simbriefStatus);
    }, [simbriefDataLoaded, boardingStarted, gsxPayloadSyncEnabled]);

    useEffect(() => {
        const centerTankMoment = -4.5;
        const innerTankMoment = -8;
        const outerTankMoment = -17.6;
        // Adjust ZFW CG Values based on payload
        const newZfw = emptyWeight + totalPax * paxWeight + totalCargo;
        const newZfwDesired = emptyWeight + totalPaxDesired * paxWeight + totalCargoDesired;
        const newZfwMoment = Loadsheet.specs.emptyPosition * emptyWeight + calculatePaxMoment() + calculateCargoMoment();
        const newZfwDesiredMoment = Loadsheet.specs.emptyPosition * emptyWeight + calculatePaxDesiredMoment() + calculateCargoDesiredMoment();
        const newZfwCg = calculateCg(newZfw, newZfwMoment);
        const newZfwDesiredCg = calculateCg(newZfwDesired, newZfwDesiredMoment);
        const totalFuel = round(totalCurrentGallon * galToKg);

        const totalFuelMoment = centerCurrent * galToKg * centerTankMoment + (LOutCurrent + ROutCurrent) * galToKg * outerTankMoment + (LInnCurrent + RInnCurrent) * galToKg * innerTankMoment;
        const newTotalWeight = newZfw + totalFuel;
        const newTotalMoment = newZfwMoment + totalFuelMoment;
        const newCg = calculateCg(newTotalWeight, newTotalMoment);

        const newTotalWeightDesired = newZfwDesired + totalFuel;
        const newTotalDesiredMoment = newZfwDesiredMoment + totalFuelMoment;
        const newDesiredCg = calculateCg(newTotalWeightDesired, newTotalDesiredMoment);

        setZfw(newZfw);
        setZfwCg(newZfwCg);
        setZfwDesired(newZfwDesired);
        setZfwDesiredCg(newZfwDesiredCg);
        setTotalWeight(newTotalWeight);
        setCg(newCg);
        setTotalDesiredWeight(newTotalWeightDesired);
        setDesiredCg(newDesiredCg);

        // TODO: Better fuel burn algorithm for estimation - consider this placeholder logic
        // Adjust MLW CG values based on estimated fuel burn
        if (destEfob > 0) {
            const OUTER_CELL_KG = 228 * galToKg;
            const INNER_CELL_KG = 1816 * galToKg;
            let centerTank = 0;
            let outerTanks = 0;
            let innerTanks = 0;
            let f = destEfob;

            f -= (OUTER_CELL_KG) * 2;
            outerTanks = ((OUTER_CELL_KG) * 2) + Math.min(f, 0);
            if (f > 0) {
                f -= (INNER_CELL_KG) * 2;
                innerTanks = ((INNER_CELL_KG) * 2) + Math.min(f, 0);
                if (f > 0) {
                    centerTank = f;
                }
            }

            const newMlw = newZfw + destEfob;
            const destFuelMoment = centerTank * centerTankMoment + outerTanks * outerTankMoment + innerTanks * innerTankMoment;
            const newMlwMoment = newZfwMoment + destFuelMoment;
            const newMlwDesired = newZfwDesired + destEfob;
            const newMlwDesiredMoment = newZfwDesiredMoment + destFuelMoment;

            const newMlwCg = calculateCg(newMlw, newMlwMoment);
            const newMlwDesiredCg = calculateCg(newMlwDesired, newMlwDesiredMoment);

            setMlw(newMlw);
            setMlwCg(newMlwCg);
            setMlwDesired(newMlwDesired);
            setMlwDesiredCg(newMlwDesiredCg);
        } else {
            setMlw(newTotalWeight);
            setMlwCg(newCg);
            setMlwDesired(newTotalWeightDesired);
            setMlwDesiredCg(newDesiredCg);
        }
    }, [
        ...pax, ...paxDesired,
        ...cargo, ...cargoDesired,
        ...fuel, destEfob,
        paxWeight, paxBagWeight,
        emptyWeight,
    ]);

    const remainingTimeString = () => {
        const minutes = Math.round(calculateBoardingTime / 60);
        const seconds = calculateBoardingTime % 60;
        const padding = seconds < 10 ? '0' : '';
        return `${minutes}:${padding}${seconds.toFixed(0)} ${t('Ground.Payload.EstimatedDurationUnit')}`;
    };

    return (
        <div>
            <div className="relative h-content-section-reduced">
                <div className="mb-10">
                    <SeatMapWidget seatMap={seatMap} desiredFlags={desiredFlags} activeFlags={activeFlags} onClickSeat={onClickSeat} />
                </div>
                <CargoWidget cargo={cargo} cargoDesired={cargoDesired} cargoMap={cargoMap} cargoStationSize={cargoStationSize} onClickCargo={onClickCargo} />

                <div className="flex relative right-0 flex-row justify-between px-4 mt-16">
                    <div className="flex flex-col flex-grow pr-24">
                        <div className="flex flex-row w-full">
                            <Card className="w-full col-1" childrenContainerClassName={`w-full ${simbriefDataLoaded ? 'rounded-r-none' : ''}`}>
                                <table className="w-full">
                                    <thead className="w-full border-b">
                                        <tr className="py-2">
                                            <th scope="col" colSpan={2} className="py-2 px-4 w-full font-medium text-center text-md">
                                                {t('Ground.Payload.Planned')}
                                            </th>
                                            <th scope="col" className="py-2 px-4 w-full font-medium text-center text-md">
                                                {t('Ground.Payload.Current')}
                                            </th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        <tr className="h-2" />

                                        <tr>
                                            <td className="px-4 font-light whitespace-nowrap text-md">
                                                {t('Ground.Payload.Passengers')}
                                            </td>
                                            <td>
                                                <TooltipWrapper text={`${t('Ground.Payload.TT.MaxPassengers')} ${maxPax}`}>
                                                    <div className={`px-4 font-light whitespace-nowrap text-md ${(gsxPayloadSyncEnabled === 1 && boardingStarted) ? 'pointer-events-none' : ''}`}>
                                                        <PayloadValueInput
                                                            min={0}
                                                            max={maxPax > 0 ? maxPax : 999}
                                                            value={totalPaxDesired}
                                                            onBlur={(x) => {
                                                                if (!Number.isNaN(parseInt(x) || parseInt(x) === 0)) {
                                                                    setTargetPax(parseInt(x));
                                                                    setTargetCargo(parseInt(x), 0);
                                                                }
                                                            }}
                                                            unit="PAX"
                                                            disabled={gsxPayloadSyncEnabled === 1 && boardingStarted}
                                                        />
                                                    </div>
                                                </TooltipWrapper>
                                            </td>
                                            <td className="px-4 w-20 font-mono font-light whitespace-nowrap text-md">
                                                <PayloadValueUnitDisplay value={totalPax} padTo={3} unit="PAX" />
                                            </td>
                                        </tr>

                                        <tr>
                                            <td className="px-4 font-light whitespace-nowrap text-md">
                                                {t('Ground.Payload.Cargo')}
                                            </td>
                                            <td>
                                                <TooltipWrapper text={`${t('Ground.Payload.TT.MaxCargo')} ${maxCargo.toFixed(0)} ${massUnitForDisplay}`}>
                                                    <div className={`px-4 font-light whitespace-nowrap text-md ${(gsxPayloadSyncEnabled === 1 && boardingStarted) ? 'pointer-events-none' : ''}`}>
                                                        <PayloadValueInput
                                                            min={0}
                                                            max={maxCargo > 0 ? Math.round(maxCargo) : 99999}
                                                            value={totalCargoDesired}
                                                            onBlur={(x) => {
                                                                if (!Number.isNaN(parseInt(x)) || parseInt(x) === 0) {
                                                                    setTargetCargo(0, parseInt(x));
                                                                }
                                                            }}
                                                            unit={massUnitForDisplay}
                                                            disabled={gsxPayloadSyncEnabled === 1 && boardingStarted}
                                                        />
                                                    </div>
                                                </TooltipWrapper>
                                            </td>
                                            <td className="px-4 w-20 font-mono font-light whitespace-nowrap text-md">
                                                <PayloadValueUnitDisplay value={totalCargo} padTo={5} unit={massUnitForDisplay} />
                                            </td>
                                        </tr>

                                        <tr>
                                            <td className="px-4 font-light whitespace-nowrap text-md">
                                                {t('Ground.Payload.ZFW')}
                                            </td>
                                            <td>
                                                <TooltipWrapper text={`${t('Ground.Payload.TT.MaxZFW')} ${Units.kilogramToUser(Loadsheet.specs.weights.maxZfw).toFixed(0)} ${usingMetric ? 'kg' : 'lb'}`}>
                                                    <div className={`px-4 font-light whitespace-nowrap text-md ${(gsxPayloadSyncEnabled === 1 && boardingStarted) ? 'pointer-events-none' : ''}`}>
                                                        <PayloadValueInput
                                                            min={Math.round(emptyWeight)}
                                                            max={Math.round(Units.kilogramToUser(Loadsheet.specs.weights.maxZfw))}
                                                            value={zfwDesired}
                                                            onBlur={(x) => {
                                                                if (!Number.isNaN(parseInt(x)) || parseInt(x) === 0) processZfw(parseInt(x));
                                                            }}
                                                            unit={massUnitForDisplay}
                                                            disabled={gsxPayloadSyncEnabled === 1 && boardingStarted}
                                                        />
                                                    </div>
                                                </TooltipWrapper>
                                            </td>
                                            <td className="px-4 w-20 font-mono font-light whitespace-nowrap text-md">
                                                <PayloadValueUnitDisplay value={zfw} padTo={5} unit={massUnitForDisplay} />
                                            </td>
                                        </tr>

                                        <tr>
                                            <td className="px-4 font-light whitespace-nowrap text-md">
                                                {t('Ground.Payload.ZFWCG')}
                                            </td>
                                            <td>
                                                <TooltipWrapper text={`${t('Ground.Payload.TT.MaxZFWCG')} ${40}%`}>
                                                    <div className="px-4 font-light whitespace-nowrap text-md">
                                                        {/* TODO FIXME: Setting pax/cargo given desired ZFWCG, ZFW, total pax, total cargo */}
                                                        <div className="py-4 px-3 rounded-md transition">
                                                            {`${zfwDesiredCg.toFixed(2)} %`}
                                                        </div>
                                                        {/*
                                                            <SimpleInput
                                                                className="my-2 w-24"
                                                                number
                                                                disabled
                                                                min={0}
                                                                max={maxPax > 0 ? maxPax : 999}
                                                                value={zfwCg.toFixed(2)}
                                                                onBlur={{(x) => processZfwCg(x)}
                                                            />
                                                            */}
                                                    </div>
                                                </TooltipWrapper>
                                            </td>
                                            <td className="px-4 font-light whitespace-nowrap text-md">
                                                {`${zfwCg.toFixed(2)} %`}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>

                                <hr className="mb-4 border-gray-700" />

                                <div className="flex flex-row justify-start items-center">
                                    <TooltipWrapper text={t('Ground.Payload.TT.PerPaxWeight')}>
                                        <div className={`flex relative flex-row items-center font-light text-medium ${(gsxPayloadSyncEnabled === 1 && boardingStarted) ? 'pointer-events-none' : ''}`}>
                                            <PersonFill size={25} className="mx-3" />
                                            <SimpleInput
                                                className={`w-24 ${(gsxPayloadSyncEnabled === 1 && boardingStarted) ? 'cursor-not-allowed placeholder-theme-body text-theme-body' : ''}`}
                                                number
                                                min={Math.round(Units.kilogramToUser(Loadsheet.specs.pax.minPaxWeight))}
                                                max={Math.round(Units.kilogramToUser(Loadsheet.specs.pax.maxPaxWeight))}
                                                placeholder={Math.round(Units.kilogramToUser(Loadsheet.specs.pax.defaultPaxWeight)).toString()}
                                                value={paxWeight.toFixed(0)}
                                                onBlur={(x) => {
                                                    if (!Number.isNaN(parseInt(x)) || parseInt(x) === 0) setPaxWeight(parseInt(x));
                                                }}
                                            />
                                            <div className="absolute top-2 right-3 text-lg text-gray-400">{usingMetric ? 'KG' : 'LB'}</div>
                                            </div>
                                    </TooltipWrapper>

                                    <TooltipWrapper text={t('Ground.Payload.TT.PerPaxBagWeight')}>
                                        <div className={`flex relative flex-row items-center font-light text-medium ${(gsxPayloadSyncEnabled === 1 && boardingStarted) ? 'pointer-events-none' : ''}`}>
                                            <BriefcaseFill size={25} className="mx-3" />
                                            <SimpleInput
                                                className={`w-24 ${(gsxPayloadSyncEnabled === 1 && boardingStarted) ? 'cursor-not-allowed placeholder-theme-body text-theme-body' : ''}`}
                                                number
                                                min={Math.round(Units.kilogramToUser(Loadsheet.specs.pax.minBagWeight))}
                                                max={Math.round(Units.kilogramToUser(Loadsheet.specs.pax.maxBagWeight))}
                                                placeholder={Math.round(Units.kilogramToUser(Loadsheet.specs.pax.defaultBagWeight)).toString()}
                                                value={paxBagWeight.toFixed(0)}
                                                onBlur={(x) => {
                                                    if (!Number.isNaN(parseInt(x)) || parseInt(x) === 0) setPaxBagWeight(parseInt(x));
                                                }}
                                            />
                                            <div className="absolute top-2 right-3 text-lg text-gray-400">{usingMetric ? 'KG' : 'LB'}</div>
                                        </div>
                                    </TooltipWrapper>
                                    {gsxPayloadSyncEnabled !== 1 && (
                                        <>
                                            <TooltipWrapper text={t('Ground.Payload.TT.StartBoarding')}>
                                                <button
                                                    type="button"
                                            className={`flex justify-center rounded-lg items-center ml-auto w-24 h-12
                                                        ${boardingStatusClass} bg-current`}
                                            onClick={() => setBoardingStarted(!boardingStarted)}
                                        >
                                            <div className="text-theme-body">
                                                <ArrowLeftRight size={32} className={boardingStarted ? 'hidden' : ''} />
                                                <StopCircleFill size={32} className={boardingStarted ? '' : 'hidden'} />
                                            </div>
                                        </button>
                                    </TooltipWrapper>

                                    <TooltipWrapper text={t('Ground.Payload.TT.StartDeboarding')}>
                                        <button
                                            type="button"
                                            className={`flex justify-center items-center ml-1 w-16 h-12 text-theme-highlight bg-current rounded-lg
                                                        ${totalPax === 0 && totalCargo === 0 && 'opacity-20 pointer-events-none'}`}
                                            onClick={() => handleDeboarding()}
                                        >
                                            <div className="text-theme-body">
                                                {' '}
                                                <BoxArrowRight size={32} className={`${boardingStarted && 'opacity-20 pointer-events-none'} : ''}`} />
                                            </div>
                                            </button>
                                            </TooltipWrapper>
                                        </>
                                    )}
                                </div>
                            </Card>

                            {showSimbriefButton
                                && (
                                    <TooltipWrapper text={t('Ground.Payload.TT.FillPayloadFromSimbrief')}>
                                        <div
                                            className={`flex justify-center items-center px-2 h-auto text-theme-body
                                                       hover:text-theme-highlight bg-theme-highlight hover:bg-theme-body
                                                       rounded-md rounded-l-none border-2 border-theme-highlight transition duration-100`}
                                            onClick={setSimBriefValues}
                                        >
                                            <CloudArrowDown size={26} />
                                        </div>
                                    </TooltipWrapper>
                                )}
                        </div>
                        {(gsxPayloadSyncEnabled !== 1) && (
                            <div className="flex flex-row mt-4">
                            <Card className="w-full h-full" childrenContainerClassName="flex flex-col w-full h-full">
                                <div className="flex flex-row justify-between items-center">
                                <div className="flex font-medium">
                                        {t('Ground.Payload.BoardingTime')}
                                        <span className="flex relative flex-row items-center ml-2 text-sm font-light">
                                            (
                                            {remainingTimeString()}
                                            )
                                        </span>
                                    </div>

                                    <SelectGroup>
                                        <SelectItem
                                            selected={boardingRate === 'INSTANT'}
                                            onSelect={() => setBoardingRate('INSTANT')}
                                        >
                                            {t('Settings.Instant')}
                                        </SelectItem>

                                        <TooltipWrapper text={`${!coldAndDark ? t('Ground.Fuel.TT.AircraftMustBeColdAndDarkToChangeRefuelTimes') : ''}`}>
                                            <div>
                                                <SelectItem
                                                    className={`${!coldAndDark && 'opacity-20'}`}
                                                    selected={boardingRate === 'FAST'}
                                                    disabled={!coldAndDark}
                                                    onSelect={() => setBoardingRate('FAST')}
                                                >
                                                    {t('Settings.Fast')}
                                                </SelectItem>
                                            </div>
                                        </TooltipWrapper>

                                        <div>
                                            <SelectItem
                                                className={`${!coldAndDark && 'opacity-20'}`}
                                                selected={boardingRate === 'REAL'}
                                                disabled={!coldAndDark}
                                                onSelect={() => setBoardingRate('REAL')}
                                            >
                                                    {t('Settings.Real')}
                                                </SelectItem>
                                            </div>
                                        </SelectGroup>
                                    </div>
                                </Card>

                                {/* <Card className="h-full w-fit" childrenContainerClassName="h-full w-fit rounded-r-none"> */}
                                {/* */}
                                {/* </Card> */}
                            </div>
                        )}
                    </div>
                    <div className="border border-theme-accent col-1">
                        <ChartWidget
                            width={525}
                            height={511}
                            envelope={Loadsheet.chart.performanceEnvelope}
                            limits={Loadsheet.chart.chartLimits}
                            cg={boardingStarted ? Math.round(cg * 100) / 100 : Math.round(desiredCg * 100) / 100}
                            totalWeight={boardingStarted ? Math.round(Units.userToKilogram(totalWeight)) : Math.round(Units.userToKilogram(totalDesiredWeight))}
                            mldwCg={boardingStarted ? Math.round(mlwCg * 100) / 100 : Math.round(mlwDesiredCg * 100) / 100}
                            mldw={boardingStarted ? Math.round(Units.userToKilogram(mlw)) : Math.round(Units.userToKilogram(mlwDesired))}
                            zfwCg={boardingStarted ? Math.round(zfwCg * 100) / 100 : Math.round(zfwDesiredCg * 100) / 100}
                            zfw={boardingStarted ? Math.round(Units.userToKilogram(zfw)) : Math.round(Units.userToKilogram(zfwDesired))}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

interface PayloadValueInputProps {
    min: number,
    max: number,
    value: number
    onBlur: (v: string) => void,
    unit: string,
    disabled?: boolean
}

const PayloadValueInput: FC<PayloadValueInputProps> = ({ min, max, value, onBlur, unit, disabled }) => (
    <div className="relative w-44">
        <SimpleInput
            className={`my-2 w-full font-mono ${(disabled ? 'cursor-not-allowed placeholder-theme-body text-theme-body' : '')}`}
            fontSizeClassName="text-2xl"
            number
            min={min}
            max={max}
            value={value.toFixed(0)}
            onBlur={onBlur}
        />
        <div className="flex absolute top-0 right-3 items-center h-full font-mono text-2xl text-gray-400">{unit}</div>
    </div>
);

interface NumberUnitDisplayProps {
    /**
     * The value to show
     */
    value: number,

    /**
     * The amount of leading zeroes to pad with
     */
    padTo: number,

    /**
     * The unit to show at the end
     */
    unit: string,
}

const PayloadValueUnitDisplay: FC<NumberUnitDisplayProps> = ({ value, padTo, unit }) => {
    const fixedValue = value.toFixed(0);
    const leadingZeroCount = Math.max(0, padTo - fixedValue.length);

    return (
        <span className="flex items-center">
            <span className="flex justify-end pr-2 w-20 text-2xl">
                <span className="text-2xl text-gray-400">{'0'.repeat(leadingZeroCount)}</span>
                {fixedValue}
            </span>
            {' '}
            <span className="text-2xl text-gray-500">{unit}</span>
        </span>
    );
};
