const { MongoClient } = require("mongodb");
const url = "mongodb+srv://hyfuser:hyfpassword@hyf-test.azvxc.mongodb.net/world?retryWrites=true&w=majority";
const client = new MongoClient(url, { useUnifiedTopology: true });
const dbName = "world";  
                  
async function run() {
  try {
    await client.connect();
    console.log("Connected correctly to server");
    const db = client.db(dbName);
    const col = db.collection("city");

    // 1. Create a New city                                                                                                                                                         
    let newCity = {
      "Name": "Kufa",
      "CountryCode": "IRQ",                                                                                                                                 
      "District": "Najaf",                                                                                                                               
      "Population": 45000
    }
    await col.insertOne(newCity);
    //  2. Update that record with a new population
    const newValues = {
      $set: {"Population": 50000}};
    await col.updateOne({"Name": "Kufa",}, newValues);

    //3- Read the document that you just updated in two ways : finding by the city name, and then by the country code
    const findResultByName        = await col.find({"Name": "Kufa"});
    const findResultByCountryCode = await col.find({"CountryCode": "IRQ"});

    await findResultByName.forEach       (doc => console.log(doc));
    await findResultByCountryCode.forEach(doc => console.log(doc));

    // 4. Delete the city
    await col.deleteOne({"Name": "Kufa"});

  } catch (err) {
         console.log(err);
  }
 
  finally {
    await client.close();
  }
}

run().catch(console.dir);