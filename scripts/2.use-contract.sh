#!/usr/bin/env bash

# exit on first error after this point to avoid redeploying with successful build
set -e

echo
echo ---------------------------------------------------------
echo "Step 0: Check for environment variable with contract name"
echo ---------------------------------------------------------
echo

[ -z "$CONTRACT" ] && echo "Missing \$CONTRACT environment variable" && exit 1
[ -z "$CONTRACT" ] || echo "Found it! \$CONTRACT is set to [ $CONTRACT ]"

echo
echo
echo ---------------------------------------------------------
echo "Step 1: Create a Workout"
echo
echo "(run this script again to see changes made by this file)"
echo ---------------------------------------------------------
echo

near call $CONTRACT create_workout '{"name":"name","weight":100,"hour":1,"tempo":false,"price":"2"}' --accountId $CONTRACT --amount 1

echo
echo
            "Show Workouts"
            near call $CONTRACT showWorkouts '{"offset":0,"limit":9}' --accountId $CONTRACT

echo
echo
echo ---------------------------------------------------------
echo "Step 2: Call 'del' functions on the contract"
echo ---------------------------------------------------------
echo

# the following line fails with an error because we can't write to storage without signing the message
# --> FunctionCallError(HostError(ProhibitedInView { method_name: "storage_write" }))
# near view $CONTRACT write '{"key": "some-key", "value":"some value"}'
near call $CONTRACT del '{"id":2066015425}' --accountId $CONTRACT

echo
echo "now run this script again to see changes made by this file"
exit 0
