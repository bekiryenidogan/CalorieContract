# CalorieContract

It's a simple contract that calculates calories burned on a walk and keeps it on the Near blockchain.

## Requirements
- Install Node.js 
- Install Yarn `npm install --global yarn` OR `npm i -g yarn`
- Install NEAR CLI `npm install --global near-cli`
- Get NEAR testnet wallet. [NEAR TESTNET WALLET](https://wallet.testnet.near.org/)

## Deploy
To Deploy your project you have to login to NEAR Testnet Account, Run codes in Terminal.
- Run `near login`, and follow the instructions it gives you.
- Add this code in package.json file under "scripts:" to make easy Build & Deploy  `"deploy": "yarn build:release && near dev-deploy ./build/release/calorie-calculator.wasm"`
- Set variable dev-id to CONTRACT.`export CONTRACT=dev###-###`

# FUNCTIONS
------------------------
## createWorkout
        
       near call $CONTRACT create_workout '{"name":"string","weight":u32,"hour"u32:,"tempo":boolean,"price":""}' --accountId YOUR_ACCOUNT_ID
    
## showWorkouts
 -Listing the workouts that created by createWorkout function. 
 
        near call $CONTRACT showWorkouts '{"offset":u32,"limit":u32}' --accountId YOUR_ACCOUNT_ID

## findWorkout
 - Lookup a workout in the PersistentUnorderetMap by workout id.
 
        near call $CONTRACT findWorkout '{"id": u32}' --accountId YOUR_ACCOUNT_ID
        
## calculateCalorie
 - Calculating the burned calorie. 
 
        near call $CONTRACT calculateCalorie '{"id":u32}' --accountId YOUR_ACCOUNT_ID
        
        
 ## del
  -  Delete a workout with his id

         near call $CONTRACT del '{"id":u32}' --accountId YOUR_ACCOUNT_ID
        
[PATİKA](https://www.patika.dev/web3/near)
