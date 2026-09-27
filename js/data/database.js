// ============================================================
// РЕЕСТР СТАТЕЙ
// ============================================================

// Введение в физику
import { physicalTerms }        from './physical-terms.js';
import { scientificMethods }    from './scientific-methods.js';
import { physicalQuantities }   from './physical-quantities.js';
import { measurementAccuracy }  from './measurement-accuracy.js';
import { physicsInTechnology }  from './physics-in-technology.js';

// Строение вещества
import { matterStructure }      from './matter-structure.js';
import { molecules }            from './molecules.js';
import { brownianMotion }       from './brownian-motion.js';
import { diffusion }            from './diffusion.js';
import { molecularForces }      from './molecular-forces.js';
import { aggregateStates }      from './aggregate-states.js';
import { molecularDifferences } from './molecular-differences.js';

// Взаимодействие тел
import { mechanicalMotion }     from './mechanical-motion.js';
import { uniformMotion }        from './uniform-motion.js';
import { speed }                from './speed.js';
import { pathTime }             from './path-time.js';
import { acceleration }         from './acceleration.js';
import { inertia }              from './inertia.js';
import { bodyInteraction }      from './body-interaction.js';
import { mass }                 from './mass.js';
import { massMeasurement }      from './mass-measurement.js';
import { density }              from './density.js';
import { massVolume }           from './mass-volume.js';
import { force }                from './force.js';
import { gravityForce }         from './gravity-force.js';
import { elasticForce }         from './elastic-force.js';
import { weight }               from './weight.js';
import { planetsGravity }       from './planets-gravity.js';
import { dynamometer }          from './dynamometer.js';
import { forceAddition }        from './force-addition.js';
import { friction }             from './friction.js';
import { staticFriction }       from './static-friction.js';
import { frictionNature }       from './friction-nature.js';

// Давление
import { pressure }             from './pressure.js';
import { gasPressure }          from './gas-pressure.js';
import { pascalLaw }            from './pascal-law.js';
import { liquidPressure }       from './liquid-pressure.js';
import { pressureCalculation }  from './pressure-calculation.js';
import { communicatingVessels } from './communicating-vessels.js';
import { airWeight }            from './air-weight.js';
import { torricelli }           from './torricelli.js';
import { barometer }            from './barometer.js';
import { manometer }            from './manometer.js';
import { hydraulicPress }       from './hydraulic-press.js';
import { fluidAction }          from './fluid-action.js';
import { archimedesForce }      from './archimedes-force.js';
import { floatingBodies }       from './floating-bodies.js';
import { shipsAeronautics }     from './ships-aeronautics.js';

// Работа и мощность. Энергия
import { mechanicalWork }       from './mechanical-work.js';
import { power }                from './power.js';
import { simpleMechanisms }     from './simple-mechanisms.js';
import { lever }                from './lever.js';
import { momentOfForce }        from './moment-of-force.js';
import { leversInLife }         from './levers-in-life.js';
import { block }                from './block.js';
import { goldenRule }           from './golden-rule.js';
import { efficiency }           from './efficiency.js';
import { mechanicalEnergy }     from './mechanical-energy.js';
import { energyConversion }     from './energy-conversion.js';

// Механика (базовая)
import { gravity }              from './gravity.js';

export const database = [
    // Введение в физику
    physicalTerms,
    scientificMethods,
    physicalQuantities,
    measurementAccuracy,
    physicsInTechnology,

    // Строение вещества
    matterStructure,
    molecules,
    brownianMotion,
    diffusion,
    molecularForces,
    aggregateStates,
    molecularDifferences,

    // Взаимодействие тел
    mechanicalMotion,
    uniformMotion,
    speed,
    pathTime,
    acceleration,
    inertia,
    bodyInteraction,
    mass,
    massMeasurement,
    density,
    massVolume,
    force,
    gravityForce,
    elasticForce,
    weight,
    planetsGravity,
    dynamometer,
    forceAddition,
    friction,
    staticFriction,
    frictionNature,

    // Давление
    pressure,
    gasPressure,
    pascalLaw,
    liquidPressure,
    pressureCalculation,
    communicatingVessels,
    airWeight,
    torricelli,
    barometer,
    manometer,
    hydraulicPress,
    fluidAction,
    archimedesForce,
    floatingBodies,
    shipsAeronautics,

    // Работа и мощность. Энергия
    mechanicalWork,
    power,
    simpleMechanisms,
    lever,
    momentOfForce,
    leversInLife,
    block,
    goldenRule,
    efficiency,
    mechanicalEnergy,
    energyConversion,

    // Механика (базовая)
    gravity
];

export function getArticleById(id) {
    return database.find(a => a.id === id);
}