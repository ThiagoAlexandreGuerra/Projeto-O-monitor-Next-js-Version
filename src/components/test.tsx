interface test_props{

    element_1: boolean,
    element_2: boolean,
    element_3: boolean
}
const test_style={
    
    color_1:{
    color:'#f00',
    },
    color_2:{
    color:'#0f0',
    },
    color_3:{
    color:'#00f',
    }
};

export default function test(prop:test_props){

    return (
        <div>
            {prop.element_1==true&&(
                <div style={test_style.color_1}>
                    Thiago
                </div>
            )}
             {prop.element_2==true&&(
                <div style={test_style.color_2}>
                    Alexandre
                </div>
            )}
            {prop.element_3==true&&(
                <div style={test_style.color_3}>
                    Guerra
                </div>
            )}
        </div>
    )
} 