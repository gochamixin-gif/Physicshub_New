// ============================================================
// РЕЕСТР СТАТЕЙ
// ============================================================

// Введение в физику
import { physicalTerms }        from './topics/physical-terms.js';
import { scientificMethods }    from './topics/scientific-methods.js';
import { physicalQuantities }   from './topics/physical-quantities.js';
import { measurementAccuracy }  from './topics/measurement-accuracy.js';
import { physicsInTechnology }  from './topics/physics-in-technology.js';

// Строение вещества
import { matterStructure }      from './topics/matter-structure.js';
import { molecules }            from './topics/molecules.js';
import { brownianMotion }       from './topics/brownian-motion.js';
import { diffusion }            from './topics/diffusion.js';
import { molecularForces }      from './topics/molecular-forces.js';
import { aggregateStates }      from './topics/aggregate-states.js';
import { molecularDifferences } from './topics/molecular-differences.js';

// Взаимодействие тел
import { mechanicalMotion }     from './topics/mechanical-motion.js';
import { uniformMotion }        from './topics/uniform-motion.js';
import { speed }                from './topics/speed.js';
import { pathTime }             from './topics/path-time.js';
import { acceleration }         from './topics/acceleration.js';
import { inertia }              from './topics/inertia.js';
import { bodyInteraction }      from './topics/body-interaction.js';
import { mass }                 from './topics/mass.js';
import { massMeasurement }      from './topics/mass-measurement.js';
import { density }              from './topics/density.js';
import { massVolume }           from './topics/mass-volume.js';
import { force }                from './topics/force.js';
import { gravityForce }         from './topics/gravity-force.js';
import { elasticForce }         from './topics/elastic-force.js';
import { weight }               from './topics/weight.js';
import { planetsGravity }       from './topics/planets-gravity.js';
import { dynamometer }          from './topics/dynamometer.js';
import { forceAddition }        from './topics/force-addition.js';
import { friction }             from './topics/friction.js';
import { staticFriction }       from './topics/static-friction.js';
import { frictionNature }       from './topics/friction-nature.js';

// Давление
import { pressure }             from './topics/pressure.js';
import { gasPressure }          from './topics/gas-pressure.js';
import { pascalLaw }            from './topics/pascal-law.js';
import { liquidPressure }       from './topics/liquid-pressure.js';
import { pressureCalculation }  from './topics/pressure-calculation.js';
import { communicatingVessels } from './topics/communicating-vessels.js';
import { airWeight }            from './topics/air-weight.js';
import { torricelli }           from './topics/torricelli.js';
import { barometer }            from './topics/barometer.js';
import { manometer }            from './topics/manometer.js';
import { hydraulicPress }       from './topics/hydraulic-press.js';
import { fluidAction }          from './topics/fluid-action.js';
import { archimedesForce }      from './topics/archimedes-force.js';
import { floatingBodies }       from './topics/floating-bodies.js';
import { shipsAeronautics }     from './topics/ships-aeronautics.js';

// Работа и мощность. Энергия
import { mechanicalWork }       from './topics/mechanical-work.js';
import { power }                from './topics/power.js';
import { simpleMechanisms }     from './topics/simple-mechanisms.js';
import { lever }                from './topics/lever.js';
import { momentOfForce }        from './topics/moment-of-force.js';
import { leversInLife }         from './topics/levers-in-life.js';
import { block }                from './topics/block.js';
import { goldenRule }           from './topics/golden-rule.js';
import { efficiency }           from './topics/efficiency.js';
import { mechanicalEnergy }     from './topics/mechanical-energy.js';
import { energyConversion }     from './topics/energy-conversion.js';

// Механика (базовая)
import { gravity }              from './topics/gravity.js';

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