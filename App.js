import React, { useState, useEffect } from 'react'
import { View, StatusBar, Image, TouchableOpacity, Text } from 'react-native'

import brain from 'brain.js'

import Fox from './src/static/fox.png'
import Bunny from './src/static/bunny.png'

const App = () => {

  const [xFox, setXFox] = useState(0)
  const [yFox, setYFox] = useState(0)

  const [xBunny, setXBunny] = useState(45)
  const [yBunny, setYBunny] = useState(45)

  const net = new brain.NeuralNetwork()

  const movementFox = (x = 0, y = 0) => {
    setXFox(xFox + x)
    setYFox(yFox + y)
  }

  const movementBunny = (x = 0, y = 0) => {
    setXBunny(xBunny + x)
    setYBunny(yBunny + y)
  }

  const runFox = (
    fx = xFox,
    fy = yFox,
  ) => {

    const data = [
      {
        input: { fx: xFox, fy: yFox, bx: xBunny, by: yBunny },
        output: { nfx: xBunny, nfy: yBunny, rec: 1 }
      }
    ]

    net.train(data)

    let { nfx, nfy, rec } = net.run(fx, fy)
    console.log(nfx, nfy, rec)
    movementFox(nfx * 5, nfy * 5)
  }

  const clear = () => {
    setXBunny(45)
    setYBunny(45)
    setXFox(0),
      setYFox(0)
  }

  return (
    <>
      <StatusBar hidden />
      <View style={{
        flex: 1,
        padding: '5%',
        backgroundColor: '#1ac6ff'
      }}>

        <View style={{
          height: '100%',
          width: '100%',
          borderWidth: 20,
          borderColor: '#ffffbd',
          backgroundColor: '#75ff66'
        }}>

          <Image style={{
            position: 'absolute',
            top: `${yFox}%`,
            left: `${xFox}%`,
            width: '20%',
            height: '10%',
            resizeMode: 'contain'
          }}
            source={Fox} />

          <Image style={{
            position: 'absolute',
            top: `${yBunny}%`,
            left: `${xBunny}%`,
            width: '10%',
            height: '10%',
            resizeMode: 'contain'
          }}
            source={Bunny} />

        </View>

      </View>
      <View style={{
        position: 'absolute',
        bottom: 0,
        height: '20%',
        width: '100%',
        padding: '5%',
        justifyContent: 'space-between'
      }}>
        <View style={{
          height: '45%',
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'space-between'
        }}>
          <TouchableOpacity
            style={{
              height: '100%',
              width: '10%',
              backgroundColor: 'orange',
              borderBottomLeftRadius: 20,
              borderTopLeftRadius: 20,
            }}
            onPress={_ => { movementFox(-5, 0) }}
          >

          </TouchableOpacity>

          <TouchableOpacity
            style={{
              height: '100%',
              width: '10%',
              backgroundColor: 'orange',
              borderBottomRightRadius: 20,
              borderTopRightRadius: 20,
            }}
            onPress={_ => { movementFox(5, 0) }}
          >

          </TouchableOpacity>

          <TouchableOpacity
            style={{
              height: '100%',
              width: '10%',
              backgroundColor: 'orange',
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
            }}
            onPress={_ => { movementFox(0, -5) }}
          >

          </TouchableOpacity>

          <TouchableOpacity
            style={{
              height: '100%',
              width: '10%',
              backgroundColor: 'orange',
              borderBottomLeftRadius: 20,
              borderBottomRightRadius: 20,
            }}
            onPress={_ => { movementFox(0, 5) }}
          >

          </TouchableOpacity>

          <TouchableOpacity
            style={{
              height: '100%',
              width: '10%',
              backgroundColor: 'gray',
              borderBottomLeftRadius: 20,
              borderTopLeftRadius: 20,
            }}
            onPress={_ => { movementBunny(-5, 0) }}
          >

          </TouchableOpacity>

          <TouchableOpacity
            style={{
              height: '100%',
              width: '10%',
              backgroundColor: 'gray',
              borderBottomRightRadius: 20,
              borderTopRightRadius: 20,
            }}
            onPress={_ => { movementBunny(5, 0) }}
          >

          </TouchableOpacity>

          <TouchableOpacity
            style={{
              height: '100%',
              width: '10%',
              backgroundColor: 'gray',
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
            }}
            onPress={_ => { movementBunny(0, -5) }}
          >

          </TouchableOpacity>

          <TouchableOpacity
            style={{
              height: '100%',
              width: '10%',
              backgroundColor: 'gray',
              borderBottomLeftRadius: 20,
              borderBottomRightRadius: 20,
            }}
            onPress={_ => { movementBunny(0, 5) }}
          >

          </TouchableOpacity>
        </View>
        <View style={{
          height: '45%',
          width: '100%',
          justifyContent: 'space-between',
          flexDirection: 'row',
          alignItems: 'center',
        }}>
          <TouchableOpacity style={{
            height: '100%',
            width: '45%',
            backgroundColor: 'purple',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 50
          }}
            onPress={_ => { runFox() }}
          >
            <Text style={{ color: 'white', fontSize: 20 }}>Step</Text>
          </TouchableOpacity>

          <TouchableOpacity style={{
            height: '100%',
            width: '45%',
            backgroundColor: 'chocolate',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 50
          }}
            onPress={_ => { clear() }}
          >
            <Text style={{ color: 'white', fontSize: 20 }}>Clear</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  )
}

export default App