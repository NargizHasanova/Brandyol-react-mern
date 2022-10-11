ctrl + space => shows imports

ctr + shift + k => delete line

react-redux :
Provider 
useSelector
useDispatch

@reduxjs/toolkit:
configureStore

baglar:
1- addtobasketde settimeout functionuna gore error gelir(basket-e basanda)
Can't perform a React state update on an unmounted component. This is a no-op, but it indicates a memory leak in your application. To fix, cancel all subscriptions and asynchronous tasks in a useEffect cleanup function.
2- headerBtmda categories arasinda kecid edende evvelden filter variydisa obirsi categoriye kecende sifirlanmir filter.Bilmirem nece duzeldim

suallar:
- reducers icindeki hansisa actionun icinde diger actionu cagira bileremmi?
- addToFavBox: (state, { payload }) => {
            state.favoriteBox = [...new Set([...state.favoriteBox, payload])]
            state.favoriteBox.map(item => {
                item.favorite = true
                return item
            }) bele dalbadal state-i deyismek olarmi?
        }
- checkvalidationda debouncing nece edim?erroru srazu gostermesin
-remember me klikinde hnasi funksionalliqlar yazilmalidi?


gorulecek isler:
pay now ya basanda qeydiyyatda deyilemse sign in cixsin
sign in olanda hesabim olmayanda giris yap yazisi olsun
valid form ,localstorage
basqa categoriye kecende filterler hamisi silinmelidi
home pagede search input


postdaki sekil tam acilmirsa skeleton olsun
selec product after filter





