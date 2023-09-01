import * as fs from "fs";
import knex from "knex";
import LOG from "lib/log";
import getConfig from "next/config";
import * as oracledb from "oracledb";
import * as path from "path";

const { serverRuntimeConfig } = getConfig();
const wallet = serverRuntimeConfig.WALLET;
const instantclient = serverRuntimeConfig.LD_LIBRARY_PATH;

const config = {
  user: serverRuntimeConfig.DATABASE_USER,
  password: serverRuntimeConfig.DATABASE_PASS,
  requestTimeout: 100,
  connectString: serverRuntimeConfig.CONNNETSTRING,
};

function updateSQLnet() {
  const sqlnet = path.join(wallet, "sqlnet.ora");
  const data = `WALLET_LOCATION = (SOURCE = (METHOD = file) (METHOD_DATA = (DIRECTORY="${wallet}")))
SSL_SERVER_DN_MATCH=yes`;
  LOG("Writing SQLnet");
  fs.writeFileSync(sqlnet, data);
}

function connect() {
  try {
    updateSQLnet();
    oracledb.initOracleClient({
      configDir: wallet,
      libDir: instantclient,
    });
  } catch (err) {
    console.log(err);
    LOG("Error on initial oracledb client");
    LOG(err);
  }
}

let cached = global.oracledb;
if (!cached) cached = global.oracledb = {};

function getKnex() {
  if (!cached.instance) {
    connect();
    cached.instance = knex({
      client: "oracledb",
      connection: config,
      acquireConnectionTimeout: 5000,
      fetchAsString: ["number", "clob"],
    });
    LOG("No instance found");
  }
  return cached.instance;
}

export default getKnex;
export function clearCache() {
  cached = {};
}
