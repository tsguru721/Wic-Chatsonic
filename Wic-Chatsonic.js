import axios from "axios";
import wixData from "wix-data";
import wixStorage from "wix-storage";
import wixLocation from "wix-location";

let prompts = ["Law2 "];
let initialPromptsToString = "";
prompts.map((value, index) => {
    let input = value;

    initialPromptsToString += input;
});
$w("#textBox1").value = initialPromptsToString;
$w("#input1").onKeyPress((event) => {
    let key = event.key; // "A"
    let shift = event.shiftKey; // true
    let meta = event.metaKey; // false
    let alt = event.altKey; // false
    let ctrl = event.ctrlKey; // false2
    let inputValue = event.target.value; // string value of text inside "#myElement" before the last KeyPress event

    if (key === "Enter" && inputValue !== "" && inputValue !== " ") {
        prompts.push(inputValue);
        let promptsToString = "";
        prompts.map((value, index) => {
            let input = " " + value;

            promptsToString += input;
        });
        $w("#textBox1").value = promptsToString;
        $w("#input1").value = "";
    }
});
$w("#button1").onClick(() => {
    let searchResult = {};
    let inputValue = $w("#searchBox2").value;
    let promptsInSearchEvent = "";
    let searchKeywardWithPrompts = "";
    prompts.map((value, index) => {
        promptsInSearchEvent += " " + value;
    });
    searchKeywardWithPrompts = promptsInSearchEvent + "" + inputValue;

    axios
        .post(
            "https://api.writesonic.com/v2/business/content/chatsonic?engine=premium",
            {
                enable_google_results: true,
                enable_memory: true,
                // history_data: [{ newKey: 'New Value' }],
                input_text: searchKeywardWithPrompts,
            },
            {
                headers: {
                    accept: "application/json",
                    "content-type": "application/json",
                    "X-API-KEY": "39a7d8bc-80b2-4764-96e2-81ed1667b5a5",
                },
            }
        )
        .then(function (response) {
            searchResult = response;
            wixStorage.local.setItem("SearchResult", searchResult.data.message);
            // const a = wixStorage.local.getItem('SearchResult');
            wixData
                .insert("SearchResult", {
                    result: searchResult.data.message,
                })
                .then((results) => {})
                .catch((error) => {
                    console.log(error);
                });
            wixLocation.to("/blank-4");

            //   //Read start
            //   const query = wixData.query("SearchResult")
            //   query.find()
            //   .then((results) => {
            //     // Do something with the results
            // console.log("Read collection data: ", results.items[0].result);
            //   })
            //   .catch((err) => {
            //     // Handle the error
            //     console.error(err);
            //   });
            // // Read end
        })
        .catch(function (error) {
            console.log(error);
        });
});

$w("#searchBox2").onKeyPress(async (event) => {
    let searchResult = {};
    let key = event.key; // "A"
    let shift = event.shiftKey; // true
    let meta = event.metaKey; // false
    let alt = event.altKey; // false
    let ctrl = event.ctrlKey; // false2
    let inputValue = event.target.value; // string value of text inside "#myElement" before the last KeyPress event
    if (key === "Enter") {
        let promptsInSearchEvent = "";
        let searchKeywardWithPrompts = "";
        prompts.map((value, index) => {
            promptsInSearchEvent += " " + value;
        });
        searchKeywardWithPrompts = promptsInSearchEvent + "" + inputValue;

        await axios
            .post(
                "https://api.writesonic.com/v2/business/content/chatsonic?engine=premium",
                {
                    enable_google_results: true,
                    enable_memory: true,
                    // history_data: [{ newKey: 'New Value' }],
                    input_text: searchKeywardWithPrompts,
                },
                {
                    headers: {
                        accept: "application/json",
                        "content-type": "application/json",
                        "X-API-KEY": "39a7d8bc-80b2-4764-96e2-81ed1667b5a5",
                    },
                }
            )
            .then(function (response) {
                searchResult = response;
                wixStorage.local.setItem(
                    "SearchResult",
                    searchResult.data.message
                );
                // const a = wixStorage.local.getItem('SearchResult');
                wixData
                    .insert("SearchResult", {
                        result: searchResult.data.message,
                    })
                    .then((results) => {})
                    .catch((error) => {
                        console.log(error);
                    });

                wixLocation.to("/blank-4");
                //   //Read start
                //   const query = wixData.query("SearchResult")
                //   query.find()
                //   .then((results) => {
                //     // Do something with the results
                // console.log("Read collection data: ", results.items[0].result);
                //   })
                //   .catch((err) => {
                //     // Handle the error
                //     console.error(err);
                //   });
                // // Read end
            })
            .catch(function (error) {
                console.log(error);
            });
    }
});
