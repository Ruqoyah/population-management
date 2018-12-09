import Location from '../models/location';

/**
 * create new location
 *
 * @param {object} req - request object
 * @param {object} res - response object
 *
 */
export const newLocation = async (req, res) => {
  try {
    // Get total male and total female passed by the user
    const { totalMale, totalFemale } = req.body

    const newLocation = new Location(req.body);

    // Assign total residents
    newLocation.totalResidents = parseInt(totalMale, 10) + parseInt(totalFemale, 10)

    // Save new location
    const location = await newLocation.save();

    return res.status(201).json(location);
  } catch (err) {
    return res.status(500).json({ error: err.message});
  }
}

/**
 * update location
 *
 * @param {object} req - request object
 * @param {object} res - response object
 *
 */
export const updateLocation = async (req, res) => {
  try {
    // Get locatiom id from params
    const { locationId } = req.params

    // Find and update location data
    await Location.findByIdAndUpdate(locationId, {$set:req.body})

    // Get a specific ocation
    const location = await Location.findById(locationId)

    // Assign total residents
    location.totalResidents = parseInt(location.totalMale, 10) + parseInt(location.totalFemale, 10)
    
    // save update
    await location.save();

    return res.status(200).json(location);
  } catch (err) {
    return res.status(500).json({ error: err.message});
  }
}

/**
 * get locations
 *
 * @param {object} req - request object
 * @param {object} res - response object
 *
 */
export const getLocations = async (req, res) => {
  try {

    const locations = await Location.find()

    return res.status(201).json(locations);
  } catch (err) {
    return res.status(500).json({ error: err.message});
  }
}

/**
 * Delete location
 *
 * @param {object} req - request object
 * @param {object} res - response object
 *
 */
export const deleteLocation = async (req, res) => {
  try {
    // Get location id from params
    const { locationId } = req.params

    // Find and delete location
    const location = await Location.findByIdAndRemove(locationId)

    // Check if contact exist
    if (!location) {
      return res.status(404).send({message: 'Location does not exist'})
    } else {
      return res.status(200).send({message: 'Location successfully deleted'})
    }
  } catch (err) {
    return res.status(500).json({error: err.message})
  }
}