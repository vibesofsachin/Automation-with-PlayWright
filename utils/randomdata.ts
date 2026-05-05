import { faker } from '@faker-js/faker';
import { Country, State, City } from 'country-state-city';


export const generateRandomUserAccountInfo = () => {
  return {

    //it should generate according to name if the name is male it should generate Mr. and if the name is female it should generate Mrs
    title: faker.person.gender() === 'Male' ? 'Mr.' : 'Mrs.',
    name: faker.person.fullName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    // make this in string format to be able to select the options in the dropdowns
    day: faker.date.birthdate({ min: 18, max: 60, mode: 'age' }).getDate().toString(),
    month: (faker.date.birthdate({ min: 18, max: 60, mode: 'age' }).getMonth() + 1).toString(),
    year: faker.date.birthdate({ min: 18, max: 60, mode: 'age' }).getFullYear().toString(),
    address: faker.location.streetAddress(),
    phone: faker.phone.number().toString(),
  };
}

export const generateRandomUserAddressInfo = () => {

  const countryName = faker.helpers.arrayElement([
    'India',
    'United States',
    'Canada',
    'Australia',
    'Israel',
    'New Zealand',
    'Singapore'
  ]);

  const country = Country.getAllCountries()
    .find(c => c.name === countryName)!;

  const allStates = State.getStatesOfCountry(country.isoCode);
  const statesWithCities = allStates.filter((state) =>
    City.getCitiesOfState(country.isoCode, state.isoCode).length > 0
  );

  const state = faker.helpers.arrayElement(
    statesWithCities.length ? statesWithCities : allStates
  );

  const cities = City.getCitiesOfState(country.isoCode, state.isoCode);
  const city = cities.length
    ? faker.helpers.arrayElement(cities)
    : { name: state.name };

  const zipLength: Record<string, number> = {
    India: 6,
    'United States': 5,
    Canada: 6,
    Australia: 4,
    Israel: 7,
    'New Zealand': 4,
    Singapore: 6
  };

  const phoneCodes: Record<string, string> = {
    India: '+91',
    'United States': '+1',
    Canada: '+1',
    Australia: '+61',
    Israel: '+972',
    'New Zealand': '+64',
    Singapore: '+65'
  };

  return {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    company: faker.company.name(),

    address1: `${faker.number.int({ min: 1, max: 999 })}, ${faker.location.street()}`,
    address2: `${city?.name}, ${state.name}`,

    country: country.name,
    state: state.name,
    city: city?.name || '',

    zipcode: faker.string.numeric(zipLength[country.name]),

    mobileNumber:
      `${phoneCodes[country.name]}${faker.string.numeric(10)}`,
  };
}