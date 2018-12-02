import React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';

export default class App extends React.Component {
  constructor(){
    super();
    this.state={
      resultText: "",
      calculationText: ""
    };
    this.operations=['DEL','+','-','x','/'];
  }

  calculateResult(){
    const text = this.state.resultText
    // do magic
    this.setState({
      calculationText: eval(text)
    })
  }

  buttonPressed(text){
    if(text == '='){
      return this.calculateResult
    }
    this.setState({
      resultText: this.state.resultText+text
    })
  }

  operate(operation){
    switch(operation) {
      case 'DEL':
              let text = this.state.resultText.split('')
              text.pop()
              this.setState({
                resultText: text.join('')
              })
              break
      case '+':
      case '-':
      case 'x':
      case '/':
              const lastChar = this.state.resultText.split('').pop()

              if(this.operations.indexOf(lastChar) >0) return

              if(this.state.resultText ==""){
                return
              }
              this.setState({
                resultText: this.state.resultText+operation
              })

    }
  }

  render() {
    let rows =[];
    let nums =[[1,2,3],[4,5,6],[7,8,9],['.',0,'=']];
    for(let i=0; i<4;i++){
      let row =[];
      for(let j=0; j<3 ;j++){
        row.push(<TouchableOpacity style={styles.btn}>
                    <Text onPress={() => this.buttonPressed(nums[i][j])} style={styles.btntext}>{nums[i][j]}</Text>
                 </TouchableOpacity>);
      }
      rows.push(<View style={styles.row}>{row}</View>);
    }

    let ops = [];
    for(let i=0; i<5; i++){
      ops.push(<TouchableOpacity style={styles.btn} onPress={() => this.operate(this.operations[i])}>
        <Text style={[styles.btntext, styles.white]}>{this.operations[i]}</Text>
     </TouchableOpacity>)
    } 

    return (
      <View style={styles.container}>
        <View style={styles.result}>
          <Text style={styles.resultText}>{this.state.resultText}</Text>
        </View>
        <View style={styles.calculation}>
          <Text style={styles.calculationText}>{this.state.calculationText}</Text>
        </View>
        <View style={styles.buttons}>
          <View style={styles.numbers}>
            {rows}
          </View>
          <View style={styles.operations}>
            {ops}
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1
    },
    row: {
      flexDirection: 'row',
      flex: 1,
      justifyContent: 'space-around',
      alignItems: 'center'
    },
    btntext: {
      fontSize: 30,

    },
    white: {
      color: 'white'
    },
    btn: {
      flex: 1,
      alignItems: 'center',
      alignSelf: 'stretch',
      justifyContent: 'center'
    },
    calculationText: {
      fontSize: 24,
      color: 'white',        
    },
    resultText: {
      fontSize: 30,
      color: 'white',
    },
    result: {
      flex: 2,
      backgroundColor: 'red',
      justifyContent: 'center',
      alignItems: 'flex-end'
    },
    calculation: {
      flex: 1,
      backgroundColor: 'green',
      justifyContent: 'center',
      alignItems: 'flex-end'
    },
    buttons: {
      flex: 7,
      flexDirection: 'row'
    },
    numbers: {
      flex: 3,
      backgroundColor: 'yellow'
    },
    operations: {
      flex: 1,
      justifyContent: 'space-around',
      alignItems: 'stretch',
      backgroundColor: 'black'
    }
});
