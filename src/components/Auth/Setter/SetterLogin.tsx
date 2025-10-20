
import React, { useState, Fragment, useContext, createContext } from 'react';
import { SafeAreaView, View, Dimensions, TextInput, TouchableOpacity, Alert, Text, StatusBar } from 'react-native';

// 색상 설정
const PRIMARY_COLOR = '#ffe4e9';
const WHITE = '#FFFFFF';
const TEXT_COLOR = '#FCA0BF';
const GRAY = '#8E8E8E';
const LIGHT_GRAY = '#DBDBDB';

// 로그인 컨텍스트 생성
const LoginContext = createContext({
  isLogin: false,
  setLogin: (value: boolean) => {}
});

interface LoginProps {
  navigation: any;
}

interface LoginInputProps {
  placeholder: string;
  secure?: boolean;
  onChangeText: (text: string) => void;
  value: string;
  showPassword?: boolean;
  onTogglePassword?: () => void;
}

// 입력 필드 컴포넌트
function LoginInput({ placeholder, secure = false, onChangeText, value, showPassword, onTogglePassword }: LoginInputProps) {
  const { width } = Dimensions.get('window');

  return (
    <View style={{ position: 'relative' }}>
      <TextInput
        style={{
          width: width * 0.85,
          height: 50,
          backgroundColor: WHITE,
          borderWidth: 1,
          borderColor: LIGHT_GRAY,
          borderRadius: 5,
          paddingHorizontal: 15,
          marginVertical: 6,
          color: TEXT_COLOR,
          fontSize: 16,
          paddingRight: secure ? 50 : 15,
        }}
        placeholder={placeholder}
        placeholderTextColor={GRAY}
        onChangeText={onChangeText}
        value={value}
        secureTextEntry={secure && !showPassword}
        autoCapitalize="none"
        autoComplete="off"
        autoCorrect={false}
      />
      {secure && (
        <TouchableOpacity
          onPress={onTogglePassword}
          style={{
            position: 'absolute',
            right: 15,
            top: 15,
            padding: 5,
          }}
        >
          <Text style={{ fontSize: 18, color: TEXT_COLOR }}>
            {showPassword ? '👁️' : '👁️‍🗨️'}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

// 로그인 처리 함수
const processLoginResponse = (response: any, navigate: () => void, setLogin: (value: boolean) => void) => {
  if (response.status === 200) {
    const { access, refresh } = response.data;
    setLogin(true);
    navigate();
  } else {
    Alert.alert(
      response.status === 400 && response.data.extra?.fields?.detail
        ? response.data.extra.fields.detail
        : '예상치 못한 오류가 발생하였습니다.'
    );
  }
};

// 요청 함수 (예제용 가짜 함수)
const Request = () => ({
  post: async (url: string, data: any) => {
    // 예제 응답
    return {
      status: 200,
      data: {
        access: 'fake-access-token',
        refresh: 'fake-refresh-token',
      },
    };
  },
});

export default function Login({ navigation }: LoginProps) {
  const { setLogin } = useContext(LoginContext);
  const { width, height } = Dimensions.get('window');
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const request = Request();

  const handleLogin = async () => {
    const response = await request.post(`/api/user/login`, form);
    processLoginResponse(
      response,
      () => navigation.navigate('SetterComplete'),
      setLogin
    );
  };

  return (
    <Fragment>
      <StatusBar barStyle="dark-content" backgroundColor={WHITE} />
      <SafeAreaView style={{ flex: 0, backgroundColor: WHITE }} />
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: WHITE,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* 닫기 버튼 */}
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            position: 'absolute',
            top: height * 0.05,
            right: width * 0.05,
            zIndex: 1,
          }}
        >
          <Text style={{ color: TEXT_COLOR, fontSize: 20, fontWeight: 'bold' }}>✕</Text>
        </TouchableOpacity>

        {/* Instagram 스타일 로고 */}
        <View style={{ marginBottom: height * 0.03 }}>
          <Text style={{
            fontSize: 42,
            fontWeight: '900',
            color: TEXT_COLOR,
            letterSpacing: 1.5,
          }}>
            FashionSeek
          </Text>
        </View>

        {/* 입력 필드들 */}
        <View style={{ width: width * 0.85, marginBottom: 20 }}>
          <LoginInput
            placeholder="Phone number, username or email"
            onChangeText={(value) => setForm((prev) => ({ ...prev, email: value }))}
            value={form.email}
          />
          <LoginInput
            placeholder="Password"
            secure
            onChangeText={(value) => setForm((prev) => ({ ...prev, password: value }))}
            value={form.password}
            showPassword={showPassword}
            onTogglePassword={() => setShowPassword(!showPassword)}
          />
        </View>

        {/* 비밀번호 찾기 링크 */}
        <TouchableOpacity style={{ alignSelf: 'flex-end', marginRight: width * 0.075, marginBottom: 20 }}>
          <Text style={{ color: PRIMARY_COLOR, fontSize: 14, fontWeight: '500' }}>
            Forgot password?
          </Text>
        </TouchableOpacity>

        {/* 로그인 버튼 */}
        <TouchableOpacity
          style={{
            width: width * 0.85,
            height: 50,
            backgroundColor: PRIMARY_COLOR,
            borderRadius: 5,
            marginBottom: 20,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={handleLogin}
        >
          <Text style={{ color: WHITE, fontSize: 16, fontWeight: 'bold' }}>Log In</Text>
        </TouchableOpacity>

        {/* OR 구분선 */}
        <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 20 }}>
          <View style={{ width: width * 0.35, height: 1, backgroundColor: LIGHT_GRAY }} />
          <Text style={{ marginHorizontal: 20, color: GRAY, fontSize: 14 }}>OR</Text>
          <View style={{ width: width * 0.35, height: 1, backgroundColor: LIGHT_GRAY }} />
        </View>

        {/* Facebook 로그인 버튼 */}
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: height * 0.1,
          }}
        >
          <Text style={{ color: PRIMARY_COLOR, fontSize: 16, fontWeight: '500' }}>
            Continue as Carlos Bravo Guardiola
          </Text>
        </TouchableOpacity>

        {/* 회원가입 링크 */}
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{ color: TEXT_COLOR, fontSize: 14 }}>Don't have an account? </Text>
          <TouchableOpacity>
            <Text style={{ color: PRIMARY_COLOR, fontSize: 14, fontWeight: '500' }}>
              Sign Up.
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </Fragment>
  );
}

// 로그인 컨텍스트 프로바이더 컴포넌트
export function LoginProvider({ children }: { children: React.ReactNode }) {
  const [isLogin, setLogin] = useState(false);

  return (
    <LoginContext.Provider value={{ isLogin, setLogin }}>
      {children}
    </LoginContext.Provider>
  );
}
