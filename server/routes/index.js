import express from 'express';
import { newLocation, getLocations, updateLocation, deleteLocation } from '../controllers/locations';
import { checkLocationInput, validateLocation, validateLocationId, validatePostBodyInput, validateUpdateBodyInput } from '../middleware'

const router = express.Router();

/** Create and get location Route
 *
 * @param  {} checkLocationInput
 * @param  {} validatePostBodyInput
 * @param  {} validateLocation
 * @param  {} newLocation
 * @param  {} getLocations
 */
router.route('/locations')
  .post(checkLocationInput, validatePostBodyInput, validateLocation, newLocation)
  .get(getLocations);

/** Update location Route
 *
 * @param  {} checkLocationInput
 * @param  {} validateUpdateBodyInput
 * @param  {} validateLocation
 * @param  {} updateLocation
 * @param  {} deleteLocation
 */
router.route('/locations/:locationId')
  .put(validateLocationId, validateUpdateBodyInput, validateLocation, updateLocation)
  .delete(validateLocationId, deleteLocation)

export default router;