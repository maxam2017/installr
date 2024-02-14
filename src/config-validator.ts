import Ajv from "ajv";
import { file } from "bun";

export async function validateConfig(config: any) {
  const schemaData = await file("assets/schema.json").text();
  const schema = JSON.parse(schemaData);
  const ajv = new Ajv();
  const validate = ajv.compile(schema);

  const isValid = validate(config);

  if (!isValid) {
    console.error(
      `Invalid configuration format: \n${JSON.stringify(
        validate.errors,
        null,
        2
      )}`
    );
    process.exit(1);
  }
}
