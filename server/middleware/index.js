import Location from '../models/location';

/** Check if any field is empty while
 * creating new location
 *
 * @param  {object} req - request
 * @param  {object} res - response
 * @param  {object} next - next
 *
 */
export const checkLocationInput = (req, res, next) => {
  if (!req.body.location) {
    return res.status(400).json({
      message: 'Location name is required'
    });
  }
  if (!req.body.totalFemale) {
    return res.status(400).json({
      message: 'Total number of female is required'
    });
  }
  if (!req.body.totalMale) {
    return res.status(400).json({
      message: 'Total number of male is required'
    });
  }
  next();
};

/** Check if location already exist
 *
 * @param  {object} req - request
 * @param  {object} res - response
 * @param  {object} next - next
 *
 */
export const validateLocation = async (req, res, next) => {
  try {
    const location = await Location.findOne({location: req.body.location})
    if (location) {
      return res.status(409).json({
        message: 'Location already exists'
      });
    }
  } catch (err) {
    return res.status(500).json({error: err.message})
  }
  next();
};

/** Check invalid post input
 *
 * @param  {object} req - request
 * @param  {object} res - response
 * @param  {object} next - next
 *
 */
export const validatePostBodyInput = async (req, res, next) => {
  if (!/^[a-z]+$/i.test(req.body.location)) {
    return res.status(400).json({
      message: 'Invalid location input value'
    });
  }
  console.log(req.body.totalFemale, 'totalFemale')
  if (!/^\d+$/.test(req.body.totalFemale)) {
    return res.status(400).json({
      message: 'Invalid total female put value'
    });
  }
  if (!/^\d+$/.test(req.body.totalMale)) {
    return res.status(400).json({
      message: 'Invalid total male input value'
    });
  }
  next()
}

/** Check invalid update input
 *
 * @param  {object} req - request
 * @param  {object} res - response
 * @param  {object} next - next
 *
 */
export const validateUpdateBodyInput = async (req, res, next) => {
  if (!/^[a-z]+$/i.test(req.body.location) && req.body.location != undefined) {
    return res.status(400).json({
      message: 'Invalid location input value'
    });
  }
  console.log(req.body.totalFemale, 'totalFemale')
  if (!/^\d+$/.test(req.body.totalFemale) && req.body.totalFemale != undefined) {
    return res.status(400).json({
      message: 'Invalid total female put value'
    });
  }
  if (!/^\d+$/.test(req.body.totalMale) && req.body.totalMale != undefined) {
    return res.status(400).json({
      message: 'Invalid total male input value'
    });
  }
  next()
}


/** validate param id
 *
 * @param  {object} req - request
 * @param  {object} res - response
 * @param  {object} next - next
 *
 */
export const validateLocationId = (req, res, next) => {
  if (req.params.locationId.match(/^[0-9a-fA-F]{24}$/) == null) {
    return res.status(400).json({
      message: 'Invalid location id'
    });
  }
  next();
};