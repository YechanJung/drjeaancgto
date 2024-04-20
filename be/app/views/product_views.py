from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from app.models import Product, Review
from app.serializer import ProductSerializer
from rest_framework import status
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger



@api_view(['GET'])
def getProducts(request):
    query = request.GET.get('query')
    print ("query=", query) 
    if query == None:
        query = ''
    products = Product.objects.filter(name__icontains=query)
    page = request.GET.get('page', 1) 
    try:
        page = int(page)
    except:
        page = 1
    paginator = Paginator(products, 5)
    print("pages=", paginator.num_pages)
    try:
        products = paginator.page(page)
    except PageNotAnInteger:
        products = paginator.page(1)
    except EmptyPage:
        products = paginator.page(paginator.num_pages)
    
    if page == None:
        page = 1
    
    page = int(page)        

    serializer = ProductSerializer(products, many=True)
    return Response({'products':serializer.data, 'page':page, 'pages':paginator.num_pages})


@api_view(['GET'])
def getProduct(request, pk):
    product = Product.objects.get(_id=pk)
    serializer = ProductSerializer(product, many=False)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createProduct(request):
    user = request.user
    product = Product.objects.create(
        user=user,
        name='Sample Name',
        price=0,
        brand='Sample Brand',
        countInStock=0,
        category='Sample Category',
        description=''
    )
    serializer = ProductSerializer(product, many=False)
    return Response(serializer.data)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateProduct(request, pk):
    data = request.data
    product = Product.objects.get(_id=pk)

    product.name = data['name']
    product.price = data['price']
    product.brand = data['brand']
    product.countInStock = data['countInStock']
    product.category = data['category']
    product.description = data['description']

    product.save()
    serializer = ProductSerializer(product, many=False)
    return Response(serializer.data)

@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def deleteProduct(request, pk):
    product = Product.objects.get(_id=pk)
    product.delete()
    return Response('Product Deleted')


@api_view(['POST'])
# @permission_classes([IsAuthenticated])
def uploadImage(response):
    data = response.data

    product_id = data['product_id']
    product = Product.objects.get(_id=product_id)

    product.image = response.FILES.get('image')
    product.save()

    return Response('Image was uploaded')


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createProductReview(request, pk):
    product = Product.objects.get(_id=pk)
    user = request.user
    data = request.data

    alreadyExists = product.review_set.filter(user=user).exists()
    if alreadyExists:
        content = {'detail': 'Product already reviewed'}
        return Response(content, status=status.HTTP_400_BAD_REQUEST)
    
    elif data['rating'] == 0:
        content = {'detail': 'Please select a rating'}
        return Response(content, status=status.HTTP_400_BAD_REQUEST)
    
    else:
        review = Review.objects.create(
            user=user,
            product=product,
            name=user.first_name,
            rating=data['rating'],
            comment=data['comment']
        )

        reviews = product.review_set.all()
        product.numReviews = len(reviews)

        total = 0
        for i in reviews:
            total += i.rating
        product.rating = total / len(reviews)
        product.save()

        return Response('Review added')
    