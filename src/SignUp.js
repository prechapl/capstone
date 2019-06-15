import React, { Component } from "react";
import { connect } from "react-redux";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView
} from "react-native";
import { signUp, getAuthedUser } from "./store/users";
import { ImagePicker, Permissions, Constants } from "expo";
import { Avatar } from "react-native-elements";

class SignUp extends Component {
  constructor() {
    super();

    this.state = {
      firstName: "",
      lastName: "",
      age: "",
      email: "",
      password: "",
      imgUrl: "",
      familyCode: "",
      newFamilyCode: "",
      newFamilyName: "",
      page: 1
    };
  }

  componentDidMount() {
    this.getPermissionAsync();
  }

  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    }
  };

  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      base64: true
    });
    console.log("result", result);

    const imageUriPrepend = "data:image/jpeg;base64,";
    let uri = imageUriPrepend.concat(result.base64);

    if (!result.cancelled) {
      this.setState({ imgUrl: uri });
    }
  };

  handleSubmit = userData => {
    userData = this.state;
    return signUp(userData)
      .then(() => this.props.getAuthedUser())
      .then(() => this.setState({ page: 1 }));
  };

  joinFamily = () => {
    const userData = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      password: this.state.password,
      age: this.state.age,
      imgUrl: this.state.imgUrl,
      familyCode: this.state.familyCode
    };

    this.handleSubmit(userData).then(() =>
      this.props.navigation.navigate("SetAllRelationships")
    );
  };

  createFamily = () => {
    const userData = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      password: this.state.password,
      age: this.state.age,
      imgUrl: this.state.imgUrl,
      family: {
        code: this.state.newFamilyCode,
        name: this.state.newFamilyName
      }
    };
    this.handleSubmit(userData).then(() =>
      this.props.navigation.navigate("Family")
    );
  };

  nextPage = () => {
    this.setState({
      page: this.state.page + 1
    });
  };

  previousPage = () => {
    this.setState({
      page: this.state.page - 1
    });
  };

  render() {
    if (this.state.page === 1) {
      return (
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
          <View style={styles.container}>
            {this.state.imgUrl ? (
              <View style={{ marginBottom: 30 }}>
                <Avatar
                  rounded
                  overlayContainerStyle={{
                    borderWidth: 7,
                    borderColor: "#009510"
                  }}
                  size={120}
                  source={{
                    uri: this.state.imgUrl
                  }}
                />
              </View>
            ) : (
              <View>
                <Text style={styles.header}>Mender</Text>
                <Text
                  style={{
                    flexDirection: "row",
                    fontSize: 12,
                    marginBottom: 16,
                    alignItems: "center"
                  }}
                >
                  sign up for a free account
                </Text>
              </View>
            )}

            <TextInput
              value={this.state.firstName}
              style={styles.input}
              placeholder="First Name"
              onChangeText={firstName => this.setState({ firstName })}
            />

            <TextInput
              value={this.state.lastName}
              style={styles.input}
              placeholder="Last Name"
              onChangeText={lastName => this.setState({ lastName })}
            />

            <TextInput
              value={this.state.age}
              style={styles.input}
              placeholder="Age"
              onChangeText={age => this.setState({ age })}
            />

            <TextInput
              value={this.state.email}
              style={styles.input}
              placeholder="Email"
              onChangeText={email => this.setState({ email })}
            />

            <TextInput
              style={styles.input}
              secureTextEntry
              value={this.state.password}
              placeholder="password"
              onChangeText={password => {
                this.setState({ password });
              }}
            />

            <TouchableOpacity style={styles.button} onPress={this._pickImage}>
              <Text style={styles.buttonText}>Select Profile Image</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={this.nextPage}>
              <Text style={styles.buttonText}>Create or Join a Family</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      );
    }

    if (this.state.page === 2) {
      return (
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
          <View style={styles.container}>
            <Text style={styles.header2}>Join Family</Text>
            <TextInput
              value={this.state.familyCode}
              style={styles.input}
              placeholder="Family Code"
              onChangeText={familyCode => this.setState({ familyCode })}
            />

            <TouchableOpacity style={styles.button} onPress={this.joinFamily}>
              <Text style={styles.buttonText}>Submit and Join Family</Text>
            </TouchableOpacity>

            <Text style={styles.header2}>Create Family</Text>
            <TextInput
              value={this.state.newFamilyCode}
              style={styles.input}
              placeholder="Family Code"
              onChangeText={newFamilyCode => this.setState({ newFamilyCode })}
            />

            <TextInput
              value={this.state.newFamilyName}
              style={styles.input}
              placeholder="Family Name"
              onChangeText={newFamilyName => this.setState({ newFamilyName })}
            />

            <TouchableOpacity style={styles.button} onPress={this.createFamily}>
              <Text style={styles.buttonText}>Submit and Create Family</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={this.previousPage}>
              <Text style={styles.buttonText}>Previous</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  input: {
    height: 40,
    backgroundColor: "#D3D3D4",
    marginBottom: 20,
    width: 300,
    paddingHorizontal: 10
  },
  button: {
    backgroundColor: "#448AE6",
    padding: 10,
    width: 300,
    margin: 10
  },
  buttonText: {
    textAlign: "center",
    color: "#FFFFFF"
  },
  header: {
    padding: 10,
    marginBottom: 30,
    fontSize: 75
  },
  header2: {
    padding: 10,
    marginBottom: 30,
    fontSize: 42
  }
});

const mapDispatchToProps = dispatch => ({
  getAuthedUser: () => dispatch(getAuthedUser())
});

export default connect(
  null,
  mapDispatchToProps
)(SignUp);
