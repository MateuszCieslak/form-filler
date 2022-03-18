import { generateNip } from "./nip.js";
import { generateRegon } from "./regon.js";
import { getRandomInt } from "./common.js";
import { generatePesel } from "./pesel.js";
import { getRandomIban } from "./iban-generator.js";
import { generateIdDocument } from "./id-number-generator.js";

export const generators = [
    { key: 'NIP', func: () => generateNip() },
    { key: 'REGON', func: () => generateRegon() },
    { key: 'RAND', func: () => getRandomInt(1000, 99999) },
    { key: 'PESEL', func: () => generatePesel() },
    { key: 'IBAN', func: () => getRandomIban() },
    { key: 'IDDOCUMENT', func: () => generateIdDocument() }
]