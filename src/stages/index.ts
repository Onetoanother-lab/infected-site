import { phishing } from './phishing';
import { pharming } from './pharming';
import { vishing } from './vishing';
import { trojan } from './trojan';
import { worm } from './worm';
import { spyware } from './spyware';
import { rootkit } from './rootkit';
import { adware } from './adware';
import { ransomware } from './ransomware';
import { STAGE_IDS } from '../types';
import type { Stage } from '../types';

/**
 * The one list that drives everything: the scroll order, the side tracker and
 * the presenter jumps. Never wire those per stage.
 */
export const stages: Stage[] = [
  phishing,
  pharming,
  vishing,
  trojan,
  worm,
  spyware,
  rootkit,
  adware,
  ransomware,
];

// Fail loudly at startup if the list and the id list ever drift apart.
stages.forEach((stage, index) => {
  if (stage.order !== index + 1) throw new Error(`Stage ${stage.id} has order ${stage.order}, expected ${index + 1}`);
  if (stage.id !== STAGE_IDS[index]) throw new Error(`Stage ${index + 1} should be ${STAGE_IDS[index]}, got ${stage.id}`);
});
