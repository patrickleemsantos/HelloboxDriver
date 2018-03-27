import React from "react";
import { View, Alert, AsyncStorage, StyleSheet, TouchableOpacity, Platform, BackHandler } from "react-native";
import { Spinner, Container, Content, ListItem, Body, List, Left, Right, Text, Header, Button, Title, Segment } from "native-base";
import { Actions } from "react-native-router-flux";
import Icon from "react-native-vector-icons/FontAwesome";

class Earnings extends React.Component {

	componentDidMount() {
		AsyncStorage.getItem('driver', (err, result) => {
            if (result) {
                let driver = JSON.parse(result);
                this.props.getEarnings(driver.driver_id);
            }
        });
		
		if (Platform.OS === 'android') {
            BackHandler.addEventListener('hardwareBackPress', function() {
                Actions.home({ reset: true });
                return true;
            });
        }
	}
    
	render () {
        handleSelectEarnings = (value) => {
			this.props.setSelectedEarnings(value);
			
			AsyncStorage.getItem('driver', (err, result) => {
                if (result) {
                    let driver = JSON.parse(result);
                    this.props.getEarnings(driver.driver_id);
                }
            });
        };

        handleGetEarnings = () => {
            AsyncStorage.getItem('driver', (err, result) => {
                if (result) {
                    let driver = JSON.parse(result);
                    this.props.getEarnings(driver.driver_id);
                }
            });
        }

        return (
            <Container>
				<View style={{flex:1}}>
					<Header hasTabs style={styles.headerColor} iosBarStyle="light-content" androidStatusBarColor="#E90000">
						<Left>
							<Button transparent onPress={() => Actions.home({ reset: true })}>
								<Icon name="arrow-left" style={styles.menu} /> 
							</Button>
						</Left>
						<Body>
							<Title style={styles.title}>Earnings</Title>		
						</Body>
						<Right>
                            <Button transparent>
                                <Icon name="refresh" style={styles.menu} onPress={() => handleGetEarnings()} /> 
                            </Button>
                        </Right>
					</Header>
					<Segment style={{backgroundColor: "#FFFFFF"}}>
						<Button 
							style={{
								backgroundColor: this.props.selectedEarnings === "day" ? "#E90000" : "#FFFFFF",
								borderColor: "#E90000",
							}}
							first 
							active={this.props.selectedEarnings === "day" ? true : false}
							onPress={() => handleSelectEarnings("day")}
						>
							<Text style={{ color: this.props.selectedEarnings === "day" ? "#FFFFFF" : "#E90000" }}>Day</Text>
						</Button>
						<Button 
							style={{
								backgroundColor: this.props.selectedEarnings === "month" ? "#E90000" : "#FFFFFF",
								borderColor: "#E90000",
							}}
							active={this.props.selectedEarnings === "month" ? true : false}
							onPress={() => handleSelectEarnings("month")}
						>
							<Text style={{ color: this.props.selectedEarnings === "month" ? "#FFFFFF" : "#E90000" }}>Month</Text>
						</Button>
                        <Button 
							style={{
								backgroundColor: this.props.selectedEarnings === "year" ? "#E90000" : "#FFFFFF",
								borderColor: "#E90000",
							}}
							last
							active={this.props.selectedEarnings === "year" ? true : false}
							onPress={() => handleSelectEarnings("year")}
						>
							<Text style={{ color: this.props.selectedEarnings === "year" ? "#FFFFFF" : "#E90000" }}>Year</Text>
						</Button>
					</Segment>
					<Content>
						{ (this.props.showBookingLoader == true) &&
							<Spinner style={styles.spinner} color='#E90000'/>

							||

							<List style={{ flex: 1, backgroundColor: '#fff' }} dataArray={this.props.driverEarnings}
								renderRow={(earnings) =>
                                <ListItem icon>
                                    <Left>
                                        <Icon style={styles.timeIcon} name="clock-o" />
                                    </Left>
                                    <Body>
                                        <Text style={styles.dateText}>{earnings._id}</Text>
                                    </Body>
                                    <Right>
                                        <Text style={styles.totalText}>PHP {earnings.total}</Text>
                                    </Right>
                                </ListItem>   
								}>
							</List>
						}
					</Content>  
				</View>
                  
            </Container>
        )
    }
}

const styles = StyleSheet.create({
	headerColor: {
        backgroundColor: "#E90000"
    },
    title: {
		color: "#FFFFFF",
	},
	menu: {
		color: "#fff",
		fontSize: 20
    },
	timeIcon:{
        fontSize:20,
        color:"#00FF00",
	},
	spinner: {
        marginTop: 100,
        alignSelf: "center"
    },
    dateText: {
        fontSize: 13
    },
    totalText:{
        fontSize: 13
    }
  });

export default Earnings;