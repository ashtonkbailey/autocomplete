const Node = require('./Node');

class Trie {
  constructor() {
    this.wordCount = 0;
    this.root = new Node()
  }

  insert(word) {
    // insert should take in a word and insert it into the trie
    // split word into array of letters// 
    // keep track of our currentNode// 
    // take off first letter and check root(current) if that letter is included as a child node object
    // if it is, traverse to that letter// 
    // if it is not, create a child with that letter// 
    // if there are more letters, repeat^^^//
    // if there are no more letters, save the inserted word as the completeword on that child node and increment wordCount

    let letters = word.toLowerCase().split('');
    let currNode = this.root;

    while (letters.length) {
      let letter = letters.shift();
      
      if (!currNode[letter]) {
        currNode[letter] = new Node();
      };

      if (!letters.length && !currNode[letter].completeWord) {
        this.wordCount++;
        currNode[letter].completeWord = word
      };
    
      currNode = currNode[letter].children;
    }
  }

  traverseDown(word) {
    // Split the word into an array so we can traverse down to the last letter
    let letters = word.toLowerCase().split('');

    // Start our traversal at the root node
    let currentNode = this.root;

    // While we still have letters to traverse down to
    while (letters.length) { 
      // shift off the first one
      let currentLetter = letters.shift();

      // try to find the currentLetter in the children of our currentNode
      let foundLetter = Object.keys(currentNode).find(letter => 
        letter === currentLetter);

      // if it finds it, reset the current node to that child's children
      if (foundLetter) {
        currentNode = currentNode[currentLetter].children;
      }
    }

    // Once the while loop has finished, return whatever our currentNode landed on
    return currentNode;
  }

  findWords(currentNode, suggestions) {
    // find words should take in a currentNode (wherever we are in our trie at the moment) and check for all the completeWord values that exist on any branch 

    // grab any children letters from our current Node
    let letters = Object.keys(currentNode);

    // loop through all of our letters
    letters.forEach(letter => {
      // if we find a complete word, push that word into our suggestions array
      if (currentNode[letter].completeWord) {
        suggestions.push(currentNode[letter].completeWord);
      }

      // if there are more children beneath our currentNode[letter]
      if (Object.keys(currentNode[letter].children).length) {
        // recursively call findWords to dig into that branch and find any completeWords
        // passing in the updated suggestions array so we can continue to build on it
        this.findWords(currentNode[letter].children, suggestions);
      }
    });

    // return the final suggestions array
    return suggestions;
  }

  suggest(prefix) { 
    //takes in prefix and looks down the trie for any completed words that include that prefix
    //set currNode to root
    //split prefix up into lowercase letters
    //while there are letters
    // set the first letter to a var
    //check the children to match that var
    //if they exist, move to that child
    //after the length runs out, check for children of the currNode
    //if it  has any children whose completed word is not null, push those words up to an array//findWords()
    //return that array

    let currNode = this.traverseDown(prefix);

    return this.findWords(currNode, [])
  }

  populate(words) {
    words.forEach(word => this.insert(word));
  }
}

module.exports = Trie;
