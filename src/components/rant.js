export function markovCount(text, num) {
    const textArr = text.split(" ");
    const markov_dict = {}
    for (let i = 0; i < (textArr.length) - num; i++) {
        let gram = textArr.slice(i, i + num);
        let next = textArr[i + num];
        if (!markov_dict[gram]) {
            markov_dict[gram] = []
        }
        markov_dict[gram].push(next);
    }
    return markov_dict
}

// picks a random word
export function startWord(text) {
    // count words
    var wordList = text.split(" ");
    var wordCount = wordList.length;
    var randNum = Math.floor(Math.random() * wordCount);
    return wordList[randNum];
}

// returns a word from the possible list of words
export function pickWord(currentModel, last_word) {
    var next_list = currentModel[last_word]
    var next_word = '';
    // if next_list is empty, outputs nothing
    // if it has options, pick a random one from the list and outputs it
    if (next_list == undefined) {
        next_word = ''
    } else {
        next_word = next_list[Math.floor(Math.random() * next_list.length)]
    }
    return next_word
}

export function rant(corpus, num) {
    // 1 first picks a random word
    // 2 generate the next word and append to the sentence
    // 3 grabs the last word of the sentence as the new start word
    // repeat 2 and 3
    var last_word = startWord(corpus);
    var current_sen = "";
    var currentModel = markovCount(corpus, 1);
    var sent_len = current_sen.split(" ").length;
    var next = "";
    while (sent_len <= num) {
        next = pickWord(currentModel, last_word)
        if (next == '') {
            break
        } else {
            current_sen = current_sen + " " + next
            last_word = next;
            sent_len = current_sen.split(" ").length;
        }
    }
    return current_sen;
}

export function generateRant(t, len, out_div) {
    var text = rant(t, len).trim();
    var l = text.split(" ")
    setInterval(splitPrint, 500);

    var i = 0;
    function splitPrint() {
        if (i < l.length) {
            var textNode = document.createTextNode(`${l[i]} `);
            out_div.appendChild(textNode)
        }
        i++;
    }
}
