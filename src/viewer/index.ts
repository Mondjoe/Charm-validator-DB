import { fetchValidators } from "../modules/api";

async function load() {
  const validators = await fetchValidators();
  console.log(validators);
}

load();